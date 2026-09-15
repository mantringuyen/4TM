-- 4TM Phase 1 Migration: Supabase Auth Email OTP + Admin Approval State Machine
-- Architecture:
--   Signup -> Supabase Auth -> Resend SMTP OTP -> verifyOtp() 
--   -> pending_verification -> pending_approval -> Admin Approval -> active

-- 1. Create account_status enum
DO $$ BEGIN
  CREATE TYPE public.account_status AS ENUM (
    'pending_verification',
    'pending_approval',
    'active',
    'suspended'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 2. Add status and approval fields to profiles table
ALTER TABLE public.profiles 
  ADD COLUMN IF NOT EXISTS status public.account_status DEFAULT 'pending_verification',
  ADD COLUMN IF NOT EXISTS approved_at timestamptz,
  ADD COLUMN IF NOT EXISTS approved_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS email_verified boolean DEFAULT false;

-- 2b. Explicit Admin Bootstrap / Seed Mechanism:
-- Admin privilege is determined strictly by role in public.profiles and MUST NEVER be granted based on email.
-- Preserves existing administrator status for accounts already explicitly assigned role = 'admin'.
UPDATE public.profiles 
SET 
  status = 'active', 
  email_verified = true,
  approved_at = COALESCE(approved_at, NOW())
WHERE role = 'admin';

-- Controlled Initial Admin Provisioning:
-- Initial admin accounts MUST be provisioned exclusively via an explicit, controlled SQL statement
-- targeting the specific Supabase Auth user UUID from auth.users:
--
-- UPDATE public.profiles
-- SET 
--   role = 'admin',
--   status = 'active',
--   email_verified = true,
--   approved_at = NOW(),
--   approved_by = NULL
-- WHERE id = '<TARGET_SUPABASE_AUTH_USER_UUID>';

-- 3. Secure helper functions to avoid recursive RLS policies
-- Strictly evaluated against auth.uid() so callers cannot probe or enumerate other accounts.
-- Direct PostgREST RPC invocation is rejected to keep these functions strictly internal.
CREATE OR REPLACE FUNCTION public.is_admin(check_user_id uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  -- Prevent direct PostgREST RPC invocation; keep execution internal to RLS, triggers, and RPCs
  IF COALESCE(current_setting('request.path', true), '') LIKE '/rpc/is_admin%' THEN
    RAISE EXCEPTION 'Direct RPC invocation of is_admin is not permitted.';
  END IF;

  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin' AND status = 'active'
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.is_active_user(check_user_id uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  -- Prevent direct PostgREST RPC invocation; keep execution internal to RLS, triggers, and RPCs
  IF COALESCE(current_setting('request.path', true), '') LIKE '/rpc/is_active_user%' THEN
    RAISE EXCEPTION 'Direct RPC invocation of is_active_user is not permitted.';
  END IF;

  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND status = 'active'
  );
END;
$$;

REVOKE ALL ON FUNCTION public.is_admin(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.is_admin(uuid) FROM anon;
GRANT EXECUTE ON FUNCTION public.is_admin(uuid) TO authenticated;

REVOKE ALL ON FUNCTION public.is_active_user(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.is_active_user(uuid) FROM anon;
GRANT EXECUTE ON FUNCTION public.is_active_user(uuid) TO authenticated;

-- 4. Secure RPC function: confirm_user_email()
-- Validates auth.users.email_confirmed_at before transitioning status from pending_verification to pending_approval
CREATE OR REPLACE FUNCTION public.confirm_user_email()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_user_id uuid := auth.uid();
  v_confirmed_at timestamptz;
  v_status public.account_status;
BEGIN
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required.';
  END IF;

  -- Verify Supabase Auth email confirmation token was verified
  SELECT email_confirmed_at INTO v_confirmed_at
  FROM auth.users
  WHERE id = v_user_id;

  IF v_confirmed_at IS NULL THEN
    RAISE EXCEPTION 'Email has not been verified in Supabase Auth.';
  END IF;

  SELECT status INTO v_status
  FROM public.profiles
  WHERE id = v_user_id;

  -- Transition pending_verification -> pending_approval
  -- Notice: Does NOT automatically activate! Account must wait for admin approval.
  IF v_status = 'pending_verification' OR v_status IS NULL THEN
    UPDATE public.profiles
    SET 
      status = 'pending_approval',
      email_verified = true,
      updated_at = NOW()
    WHERE id = v_user_id;

    RETURN jsonb_build_object(
      'success', true,
      'status', 'pending_approval',
      'message', 'Your email is verified. Your account is waiting for admin approval.'
    );
  END IF;

  RETURN jsonb_build_object(
    'success', true,
    'status', v_status,
    'message', 'Account status maintained.'
  );
END;
$$;

REVOKE ALL ON FUNCTION public.confirm_user_email() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.confirm_user_email() TO authenticated;

-- 5. Secure Admin-only RPC function: admin_set_user_status()
-- Allows active administrators to approve accounts (pending_approval -> active) or suspend
CREATE OR REPLACE FUNCTION public.admin_set_user_status(
  target_user_id uuid, 
  new_status public.account_status
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  caller_id uuid := auth.uid();
  target_email text;
BEGIN
  IF caller_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required.';
  END IF;

  -- Server-side enforcement: Only active administrators can alter account status
  IF NOT public.is_admin(caller_id) THEN
    RAISE EXCEPTION 'Access denied. Only active administrators can modify account status.';
  END IF;

  -- Prevent self-demotion or self-suspension
  IF caller_id = target_user_id AND new_status != 'active' THEN
    RAISE EXCEPTION 'Administrators cannot change their own account status.';
  END IF;

  SELECT email INTO target_email FROM public.profiles WHERE id = target_user_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Target user profile not found.';
  END IF;

  UPDATE public.profiles
  SET 
    status = new_status,
    approved_at = CASE WHEN new_status = 'active' THEN NOW() ELSE approved_at END,
    approved_by = CASE WHEN new_status = 'active' THEN caller_id ELSE approved_by END,
    updated_at = NOW()
  WHERE id = target_user_id;

  RETURN jsonb_build_object(
    'success', true,
    'user_id', target_user_id,
    'email', target_email,
    'status', new_status
  );
END;
$$;

REVOKE ALL ON FUNCTION public.admin_set_user_status(uuid, public.account_status) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.admin_set_user_status(uuid, public.account_status) TO authenticated;

-- 6. Trigger: Prevent self-escalation on direct profile updates
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
  -- Determine whether caller has verified active administrator privileges
  v_is_caller_admin := public.is_admin(v_caller_id);

  IF NOT v_is_caller_admin THEN
    -- 1. Role is strictly immutable by non-admin callers
    NEW.role := OLD.role;

    -- 2. Approval metadata is strictly immutable by non-admin callers (neutralize fabrication)
    NEW.approved_at := OLD.approved_at;
    NEW.approved_by := OLD.approved_by;

    -- Fetch Supabase Auth confirmation timestamp for the caller (if authenticated)
    IF v_caller_id IS NOT NULL THEN
      SELECT email_confirmed_at INTO v_auth_confirmed_at
      FROM auth.users
      WHERE id = v_caller_id;
    END IF;

    -- 3. Status state-machine enforcement for non-admin callers:
    IF NEW.status IS DISTINCT FROM OLD.status THEN
      -- Only allow the specific transition: pending_verification -> pending_approval
      -- when ALL conditions are true:
      --   * NEW.id = auth.uid()
      --   * OLD.status = 'pending_verification'
      --   * NEW.status = 'pending_approval'
      --   * auth.users.email_confirmed_at IS NOT NULL
      IF (
        NEW.id = v_caller_id
        AND OLD.status = 'pending_verification'
        AND NEW.status = 'pending_approval'
        AND v_auth_confirmed_at IS NOT NULL
      ) THEN
        -- Allowed: legitimate transition via confirm_user_email()
        NULL;
      ELSE
        -- Disallowed: reject any other transition (to active, suspended, or without email confirmation)
        NEW.status := OLD.status;
      END IF;
    END IF;

    -- 4. Email verification flag enforcement for non-admin callers:
    IF NEW.email_verified IS DISTINCT FROM OLD.email_verified THEN
      -- Only allow email_verified = true if caller owns the record and email is confirmed in auth.users
      IF (
        NEW.email_verified = true
        AND NEW.id = v_caller_id
        AND v_auth_confirmed_at IS NOT NULL
      ) THEN
        -- Allowed: legitimate email verification
        NULL;
      ELSE
        -- Disallowed: neutralize unauthorized manual setting of email_verified
        NEW.email_verified := OLD.email_verified;
      END IF;
    END IF;

  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_protect_profile_sensitive_fields ON public.profiles;
CREATE TRIGGER trg_protect_profile_sensitive_fields
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.protect_profile_sensitive_fields();

-- 7. Trigger on auth.users: Automatically create profile with status 'pending_verification'
-- All public signups default to role = 'user' and status = 'pending_verification'.
-- Absolutely NO automatic admin elevation or instant activation based on email domain or address.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    email,
    display_name,
    role,
    status,
    email_verified,
    approved_at,
    approved_by,
    xp,
    streak,
    last_active_date,
    created_at,
    updated_at
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)),
    'user',
    'pending_verification'::public.account_status,
    false,
    NULL,
    NULL,
    0,
    1,
    CURRENT_DATE::text,
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE
  SET 
    email = EXCLUDED.email,
    display_name = COALESCE(EXCLUDED.display_name, public.profiles.display_name);
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();

-- 8. Row Level Security Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topic_mastery ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can view own profile, admins can view all profiles
DROP POLICY IF EXISTS "Users can read own profile or admins read all" ON public.profiles;
CREATE POLICY "Users can read own profile or admins read all"
ON public.profiles FOR SELECT
TO authenticated
USING (id = auth.uid() OR public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Users can update own safe profile info" ON public.profiles;
CREATE POLICY "Users can update own safe profile info"
ON public.profiles FOR UPDATE
TO authenticated
USING (id = auth.uid() OR public.is_admin(auth.uid()))
WITH CHECK (id = auth.uid() OR public.is_admin(auth.uid()));

-- Data Tables: Requires profiles.status = 'active'
DROP POLICY IF EXISTS "Active users can manage own lesson_progress" ON public.lesson_progress;
CREATE POLICY "Active users can manage own lesson_progress"
ON public.lesson_progress FOR ALL
TO authenticated
USING (user_id = auth.uid() AND public.is_active_user(auth.uid()))
WITH CHECK (user_id = auth.uid() AND public.is_active_user(auth.uid()));

DROP POLICY IF EXISTS "Active users can manage own bookmarks" ON public.bookmarks;
CREATE POLICY "Active users can manage own bookmarks"
ON public.bookmarks FOR ALL
TO authenticated
USING (user_id = auth.uid() AND public.is_active_user(auth.uid()))
WITH CHECK (user_id = auth.uid() AND public.is_active_user(auth.uid()));

DROP POLICY IF EXISTS "Active users can manage own notes" ON public.notes;
CREATE POLICY "Active users can manage own notes"
ON public.notes FOR ALL
TO authenticated
USING (user_id = auth.uid() AND public.is_active_user(auth.uid()))
WITH CHECK (user_id = auth.uid() AND public.is_active_user(auth.uid()));

DROP POLICY IF EXISTS "Active users can manage own topic_mastery" ON public.topic_mastery;
CREATE POLICY "Active users can manage own topic_mastery"
ON public.topic_mastery FOR ALL
TO authenticated
USING (user_id = auth.uid() AND public.is_active_user(auth.uid()))
WITH CHECK (user_id = auth.uid() AND public.is_active_user(auth.uid()));
