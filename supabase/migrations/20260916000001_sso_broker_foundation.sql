-- 4TM SSO Broker Foundation Migration (Phase 1)
-- Architecture A: Custom 4TM SSO Ticket + Exact Authorization-Request State Binding

-- Enable pgcrypto for digest() and gen_random_bytes() if not enabled
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;

-- 1. Create public.sso_allowed_origins
CREATE TABLE IF NOT EXISTS public.sso_allowed_origins (
    origin text PRIMARY KEY,
    enabled boolean DEFAULT true NOT NULL,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL,
    CONSTRAINT sso_origin_no_wildcards CHECK (origin NOT LIKE '%*%' AND (origin LIKE 'http://%' OR origin LIKE 'https://%'))
);

ALTER TABLE public.sso_allowed_origins ENABLE ROW LEVEL SECURITY;

-- Allow public read access to enabled sso_allowed_origins
DO $$ BEGIN
    CREATE POLICY "Allow public read access to enabled sso_allowed_origins"
        ON public.sso_allowed_origins FOR SELECT
        USING (enabled = true);
EXCEPTION WHEN duplicate_object THEN null;
END $$;

-- Seed initial exact allowed origins
INSERT INTO public.sso_allowed_origins (origin, enabled) VALUES
    ('https://4tm.io.vn', true),
    ('https://study.4tm.io.vn', true),
    ('https://apps.4tm.io.vn', true),
    ('https://games.4tm.io.vn', true),
    ('https://ebook.4tm.io.vn', true),
    ('https://tools.4tm.io.vn', true),
    ('http://localhost:3000', true),
    ('http://localhost:3001', true)
ON CONFLICT (origin) DO UPDATE SET enabled = EXCLUDED.enabled, updated_at = now();

-- 2. Create public.sso_tickets
CREATE TABLE IF NOT EXISTS public.sso_tickets (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_hash text UNIQUE NOT NULL,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    target_origin text NOT NULL REFERENCES public.sso_allowed_origins(origin),
    state_hash text NOT NULL,
    created_at timestamptz DEFAULT now() NOT NULL,
    expires_at timestamptz DEFAULT (now() + INTERVAL '30 seconds') NOT NULL,
    used_at timestamptz
);

ALTER TABLE public.sso_tickets ENABLE ROW LEVEL SECURITY;

-- Index for ticket lookup and consumption
CREATE INDEX IF NOT EXISTS idx_sso_tickets_lookup 
    ON public.sso_tickets (ticket_hash, target_origin, state_hash) 
    WHERE used_at IS NULL;

-- 3. Function: issue_sso_ticket(p_target_origin text, p_state text)
-- Called by authenticated Root session to mint a 30-second single-use SSO ticket.
CREATE OR REPLACE FUNCTION public.issue_sso_ticket(p_target_origin text, p_state text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions, pg_temp
AS $$
DECLARE
    v_caller_id uuid;
    v_origin_enabled boolean;
    v_raw_ticket text;
    v_ticket_hash text;
    v_state_hash text;
BEGIN
    -- 1. Obtain caller identity strictly from authenticated session
    v_caller_id := auth.uid();
    IF v_caller_id IS NULL THEN
        RAISE EXCEPTION 'Authentication required to issue SSO ticket' USING ERRCODE = '42501';
    END IF;

    -- 2. Validate exact target origin against enabled sso_allowed_origins
    SELECT enabled INTO v_origin_enabled
    FROM public.sso_allowed_origins
    WHERE origin = p_target_origin;

    IF v_origin_enabled IS NOT TRUE THEN
        RAISE EXCEPTION 'Target origin % is not an allowed SSO origin', p_target_origin USING ERRCODE = '42501';
    END IF;

    -- 3. Validate state parameter
    IF p_state IS NULL OR length(trim(p_state)) = 0 THEN
        RAISE EXCEPTION 'Authorization request state parameter is required' USING ERRCODE = '22023';
    END IF;

    -- 4. Generate CSPRNG 256-bit raw ticket
    v_raw_ticket := 'st_live_' || encode(gen_random_bytes(32), 'hex');

    -- 5. Calculate SHA-256 hashes for ticket and state
    v_ticket_hash := encode(digest(v_raw_ticket, 'sha256'), 'hex');
    v_state_hash := encode(digest(p_state, 'sha256'), 'hex');

    -- 6. Insert ticket record (30-second TTL)
    INSERT INTO public.sso_tickets (
        ticket_hash,
        user_id,
        target_origin,
        state_hash,
        created_at,
        expires_at,
        used_at
    ) VALUES (
        v_ticket_hash,
        v_caller_id,
        p_target_origin,
        v_state_hash,
        now(),
        now() + INTERVAL '30 seconds',
        NULL
    );

    -- 7. Return raw ticket ONLY to caller
    RETURN v_raw_ticket;
END;
$$;

-- 4. Function: issue_root_handoff_ticket(p_state text)
-- Called by authenticated peer products to mint an SSO handoff ticket strictly bound to Root (4tm.io.vn).
-- Target origin is hardcoded to https://4tm.io.vn to prevent lateral peer-to-peer ticket minting.
CREATE OR REPLACE FUNCTION public.issue_root_handoff_ticket(p_state text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions, pg_temp
AS $$
DECLARE
    v_caller_id uuid;
    v_raw_ticket text;
    v_ticket_hash text;
    v_state_hash text;
BEGIN
    -- 1. Enforce authenticated session
    v_caller_id := auth.uid();
    IF v_caller_id IS NULL THEN
        RAISE EXCEPTION 'Authentication required to issue SSO handoff ticket' USING ERRCODE = '42501';
    END IF;

    -- 2. Validate state parameter
    IF p_state IS NULL OR length(trim(p_state)) = 0 THEN
        RAISE EXCEPTION 'Authorization request state parameter is required' USING ERRCODE = '22023';
    END IF;

    -- 3. Generate CSPRNG 256-bit raw ticket
    v_raw_ticket := 'st_live_' || encode(gen_random_bytes(32), 'hex');

    -- 4. Calculate SHA-256 hashes for ticket and state
    v_ticket_hash := encode(digest(v_raw_ticket, 'sha256'), 'hex');
    v_state_hash := encode(digest(p_state, 'sha256'), 'hex');

    -- 5. Insert ticket record strictly bound to Root (30-second TTL)
    INSERT INTO public.sso_tickets (
        ticket_hash,
        user_id,
        target_origin,
        state_hash,
        created_at,
        expires_at,
        used_at
    ) VALUES (
        v_ticket_hash,
        v_caller_id,
        'https://4tm.io.vn',
        v_state_hash,
        now(),
        now() + INTERVAL '30 seconds',
        NULL
    );

    -- 6. Return raw ticket to authenticated peer caller
    RETURN v_raw_ticket;
END;
$$;

-- 5. Function: consume_sso_ticket(p_ticket_hash text, p_target_origin text, p_state_hash text)
-- Called by Cloudflare Worker service role during exchange to atomically consume ticket.
CREATE OR REPLACE FUNCTION public.consume_sso_ticket(
    p_ticket_hash text,
    p_target_origin text,
    p_state_hash text
)
RETURNS TABLE (
    user_id uuid,
    user_email text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions, pg_temp
AS $$
DECLARE
    v_ticket_id uuid;
    v_user_id uuid;
    v_email text;
BEGIN
    -- Atomically lock and update ticket row if valid, unexpired, unused, and exact origin & state match
    UPDATE public.sso_tickets
    SET used_at = now()
    WHERE id = (
        SELECT t.id
        FROM public.sso_tickets t
        WHERE t.ticket_hash = p_ticket_hash
          AND t.target_origin = p_target_origin
          AND t.state_hash = p_state_hash
          AND t.used_at IS NULL
          AND t.expires_at > now()
        FOR UPDATE SKIP LOCKED
    )
    RETURNING sso_tickets.id, sso_tickets.user_id INTO v_ticket_id, v_user_id;

    IF v_ticket_id IS NULL THEN
        -- Ticket nonexistent, expired, already used, or mismatched origin/state
        RETURN;
    END IF;

    -- Fetch email for the user from auth.users
    SELECT u.email INTO v_email
    FROM auth.users u
    WHERE u.id = v_user_id;

    IF v_email IS NOT NULL THEN
        RETURN QUERY SELECT v_user_id, v_email;
    END IF;
END;
$$;

-- Revoke execution privileges from PUBLIC to prevent unauthorized anonymous execution
REVOKE EXECUTE ON FUNCTION public.issue_sso_ticket(text, text) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.issue_sso_ticket(text, text) FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.issue_root_handoff_ticket(text) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.consume_sso_ticket(text, text, text) FROM PUBLIC;

-- Grant execution privileges on issue_sso_ticket strictly to service_role and postgres (broker-only)
GRANT EXECUTE ON FUNCTION public.issue_sso_ticket(text, text) TO service_role, postgres;

-- Grant execution privileges on issue_root_handoff_ticket to authenticated peer users
GRANT EXECUTE ON FUNCTION public.issue_root_handoff_ticket(text) TO authenticated;

-- Grant execution privileges on consume_sso_ticket to service_role and postgres
GRANT EXECUTE ON FUNCTION public.consume_sso_ticket(text, text, text) TO service_role, postgres;
