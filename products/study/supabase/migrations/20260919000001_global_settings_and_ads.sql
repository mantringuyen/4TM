-- 4TM Phase 2 Migration: Centralized System Settings & Global Ad Management
-- Features:
-- 1. public.system_settings table with RLS (public read, admin write)
-- 2. public_registration_enabled global control (default: false)
-- 3. global ads_enabled and per-product ad configurations
-- 4. ad_free field on public.profiles
-- 5. Secure database RPCs for admin settings and user ad-free toggles

-- 1. Create public.system_settings table
CREATE TABLE IF NOT EXISTS public.system_settings (
    key text PRIMARY KEY,
    value jsonb NOT NULL,
    description text,
    updated_at timestamptz DEFAULT now() NOT NULL,
    updated_by uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;

-- Allow public read access to all system settings
DO $$ BEGIN
    DROP POLICY IF EXISTS "Allow public read access to system_settings" ON public.system_settings;
    CREATE POLICY "Allow public read access to system_settings"
        ON public.system_settings FOR SELECT
        USING (true);
EXCEPTION WHEN duplicate_object THEN null;
END $$;

-- Allow write access only to verified administrators
DO $$ BEGIN
    DROP POLICY IF EXISTS "Allow admin write access to system_settings" ON public.system_settings;
    CREATE POLICY "Allow admin write access to system_settings"
        ON public.system_settings FOR ALL
        TO authenticated
        USING (public.is_admin(auth.uid()))
        WITH CHECK (public.is_admin(auth.uid()));
EXCEPTION WHEN duplicate_object THEN null;
END $$;

-- 2. Seed initial default settings
-- Default public_registration_enabled is FALSE
INSERT INTO public.system_settings (key, value, description, updated_at) VALUES
    ('public_registration_enabled', 'false'::jsonb, 'Controls whether new public user registration is open or closed.', now()),
    ('ads_enabled', 'true'::jsonb, 'Master switch for global ad system across 4TM ecosystem.', now()),
    ('ads_products', '{"study": true, "ebook": true, "tools": true, "games": true, "apps": true, "root": true}'::jsonb, 'Per-product ad display controls.', now()),
    ('ad_provider', '{"type": "partner_banner", "network": "house"}'::jsonb, 'Global ad network provider configuration.', now())
ON CONFLICT (key) DO NOTHING;

-- 3. Add ad_free column to public.profiles
ALTER TABLE public.profiles
    ADD COLUMN IF NOT EXISTS ad_free boolean DEFAULT false NOT NULL;

-- Protect ad_free from client self-escalation
CREATE OR REPLACE FUNCTION public.protect_profile_sensitive_fields()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_caller_id uuid := auth.uid();
  v_is_caller_admin boolean;
  v_auth_confirmed_at timestamptz;
BEGIN
  v_is_caller_admin := public.is_admin(v_caller_id);

  IF NOT v_is_caller_admin THEN
    NEW.role := OLD.role;
    NEW.approved_at := OLD.approved_at;
    NEW.approved_by := OLD.approved_by;
    NEW.ad_free := OLD.ad_free;

    IF v_caller_id IS NOT NULL THEN
      SELECT email_confirmed_at INTO v_auth_confirmed_at
      FROM auth.users
      WHERE id = v_caller_id;
    END IF;

    IF NEW.status IS DISTINCT FROM OLD.status THEN
      IF (
        NEW.id = v_caller_id
        AND OLD.status = 'pending_verification'
        AND NEW.status = 'pending_approval'
        AND v_auth_confirmed_at IS NOT NULL
      ) THEN
        NULL;
      ELSE
        NEW.status := OLD.status;
      END IF;
    END IF;

    IF NEW.email_verified IS DISTINCT FROM OLD.email_verified THEN
      IF (
        NEW.email_verified = true
        AND NEW.id = v_caller_id
        AND v_auth_confirmed_at IS NOT NULL
      ) THEN
        NULL;
      ELSE
        NEW.email_verified := OLD.email_verified;
      END IF;
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

-- 4. Secure Admin-only RPC: admin_update_system_setting()
CREATE OR REPLACE FUNCTION public.admin_update_system_setting(
    p_key text,
    p_value jsonb,
    p_description text DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
    v_caller_id uuid := auth.uid();
BEGIN
    IF v_caller_id IS NULL THEN
        RAISE EXCEPTION 'Authentication required.' USING ERRCODE = '42501';
    END IF;

    IF NOT public.is_admin(v_caller_id) THEN
        RAISE EXCEPTION 'Access denied. Only administrators can update system settings.' USING ERRCODE = '42501';
    END IF;

    IF p_key IS NULL OR length(trim(p_key)) = 0 THEN
        RAISE EXCEPTION 'Setting key cannot be empty.' USING ERRCODE = '22023';
    END IF;

    INSERT INTO public.system_settings (key, value, description, updated_at, updated_by)
    VALUES (p_key, p_value, p_description, now(), v_caller_id)
    ON CONFLICT (key) DO UPDATE
    SET
        value = EXCLUDED.value,
        description = COALESCE(EXCLUDED.description, public.system_settings.description),
        updated_at = now(),
        updated_by = v_caller_id;

    RETURN jsonb_build_object(
        'success', true,
        'key', p_key,
        'value', p_value,
        'updated_at', now()
    );
END;
$$;

REVOKE ALL ON FUNCTION public.admin_update_system_setting(text, jsonb, text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.admin_update_system_setting(text, jsonb, text) FROM anon;
GRANT EXECUTE ON FUNCTION public.admin_update_system_setting(text, jsonb, text) TO authenticated;

-- 5. Secure Admin-only RPC: admin_set_user_ad_free()
CREATE OR REPLACE FUNCTION public.admin_set_user_ad_free(
    target_user_id uuid,
    p_ad_free boolean
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
    v_caller_id uuid := auth.uid();
BEGIN
    IF v_caller_id IS NULL THEN
        RAISE EXCEPTION 'Authentication required.' USING ERRCODE = '42501';
    END IF;

    IF NOT public.is_admin(v_caller_id) THEN
        RAISE EXCEPTION 'Access denied. Only administrators can manage ad-free status.' USING ERRCODE = '42501';
    END IF;

    UPDATE public.profiles
    SET
        ad_free = p_ad_free,
        updated_at = now()
    WHERE id = target_user_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Target user profile not found.' USING ERRCODE = 'P0002';
    END IF;

    RETURN jsonb_build_object(
        'success', true,
        'user_id', target_user_id,
        'ad_free', p_ad_free
    );
END;
$$;

REVOKE ALL ON FUNCTION public.admin_set_user_ad_free(uuid, boolean) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.admin_set_user_ad_free(uuid, boolean) FROM anon;
GRANT EXECUTE ON FUNCTION public.admin_set_user_ad_free(uuid, boolean) TO authenticated;

-- 6. Enforce Registration Control at Database Level
-- If public_registration_enabled is false, reject public user sign-ups
CREATE OR REPLACE FUNCTION public.check_public_registration_allowed()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
    v_reg_enabled jsonb;
    v_is_admin boolean := false;
    v_caller_id uuid := auth.uid();
BEGIN
    -- If created by service_role (backend admin service), allow
    IF coalesce(auth.role(), current_setting('role', true)) = 'service_role' THEN
        RETURN NEW;
    END IF;

    -- If created by an authenticated admin, verify server-side
    IF v_caller_id IS NOT NULL THEN
        v_is_admin := public.is_admin(v_caller_id);
    END IF;

    IF v_is_admin THEN
        RETURN NEW;
    END IF;

    -- Note: raw_user_meta_data->>'created_by_admin' is strictly audit metadata and does NOT grant bypass privileges.

    -- Query system setting
    SELECT value INTO v_reg_enabled
    FROM public.system_settings
    WHERE key = 'public_registration_enabled';

    -- Default is FALSE if not found
    IF v_reg_enabled IS NULL OR v_reg_enabled = 'false'::jsonb OR v_reg_enabled = '0'::jsonb THEN
        RAISE EXCEPTION 'Public registration is currently disabled. Please contact the administrator.'
            USING ERRCODE = '54000';
    END IF;

    RETURN NEW;
END;
$$;

-- Trigger on auth.users before insert
DROP TRIGGER IF EXISTS trg_check_public_registration ON auth.users;
CREATE TRIGGER trg_check_public_registration
BEFORE INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.check_public_registration_allowed();
