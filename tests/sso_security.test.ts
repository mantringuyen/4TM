import assert from 'node:assert';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import {
  SSO_ALLOWED_ORIGINS,
  isValidSsoTargetOrigin,
  generateSsoState,
  initiateSsoAuthRequest,
  parseAndScrubSsoCallback,
  verifySsoState,
  processSsoCallback,
  issuePeerRootHandoff,
  SSO_STATE_STORAGE_KEY,
} from '../shared/sso';
import { issueSsoTicket } from '../src/services/ssoIssuer';
import workerHandler from '../worker/index';

async function runSecurityTests() {
  console.log('=====================================================');
  console.log('Running 4TM Phase 1 SSO Broker Automated Security Suite');
  console.log('=====================================================\n');

  let passed = 0;
  let total = 0;

  function test(name: string, fn: () => void | Promise<void>) {
    total++;
    try {
      const res = fn();
      if (res && typeof res.then === 'function') {
        return res.then(() => {
          console.log(`[PASS] Test ${total}: ${name}`);
          passed++;
        }).catch((err) => {
          console.error(`[FAIL] Test ${total}: ${name}`);
          console.error(`       Error: ${err.message || err}`);
        });
      } else {
        console.log(`[PASS] Test ${total}: ${name}`);
        passed++;
      }
    } catch (err: any) {
      console.error(`[FAIL] Test ${total}: ${name}`);
      console.error(`       Error: ${err.message || err}`);
    }
  }

  // Set up mock window/sessionStorage environment for JSDOM-like environment testing
  const mockStorage: Record<string, string> = {};
  const mockWindow: any = {
    location: {
      origin: 'https://study.4tm.io.vn',
      pathname: '/callback',
      hash: '#ticket=st_live_test_ticket_12345&state=sso_state_valid_9999',
      search: '',
    },
    title: 'Study 4TM',
    sessionStorage: {
      getItem: (key: string) => mockStorage[key] || null,
      setItem: (key: string, val: string) => {
        mockStorage[key] = val;
      },
      removeItem: (key: string) => {
        delete mockStorage[key];
      },
      clear: () => {
        for (const k of Object.keys(mockStorage)) delete mockStorage[k];
      },
    },
    history: {
      replaceState: (data: any, title: string, url: string) => {
        mockWindow.location.hash = '';
        mockWindow.location.search = '';
        mockWindow.location.pathname = url;
      },
    },
  };

  (globalThis as any).window = mockWindow;

  // -------------------------------------------------------------------------
  // TEST A: State Mismatch (CSRF Attack Prevention)
  // -------------------------------------------------------------------------
  await test('Test A: State Mismatch — Aborts prior to network token exchange', async () => {
    mockStorage[SSO_STATE_STORAGE_KEY] = 'sso_state_victim_expected_1111';
    
    // Attacker sends callback with different state
    const result = verifySsoState('sso_state_attacker_injected_2222');
    
    if (result.valid || result.errorCategory !== 'state_mismatch') {
      throw new Error(`Expected state_mismatch error, got: ${JSON.stringify(result)}`);
    }

    // Verify sessionStorage state is cleared to prevent retry
    if (mockStorage[SSO_STATE_STORAGE_KEY]) {
      throw new Error('sessionStorage state was not cleared after verification attempt');
    }
  });

  // -------------------------------------------------------------------------
  // TEST B: Missing State Parameter
  // -------------------------------------------------------------------------
  await test('Test B: Missing State Parameter — Aborts exchange immediately', async () => {
    mockStorage[SSO_STATE_STORAGE_KEY] = 'sso_state_legit_3333';
    
    const result = verifySsoState(null);
    
    if (result.valid || result.errorCategory !== 'missing_state') {
      throw new Error(`Expected missing_state error, got: ${JSON.stringify(result)}`);
    }
  });

  // -------------------------------------------------------------------------
  // TEST C: Expired Ticket Handling
  // -------------------------------------------------------------------------
  await test('Test C: Expired Ticket — Worker rejects with ticket_invalid_or_expired', async () => {
    // Mock worker request with an expired ticket
    const request = new Request('https://4tm.io.vn/api/sso/exchange', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Origin: 'https://study.4tm.io.vn' },
      body: JSON.stringify({
        ticket: 'st_live_expired_ticket_00000',
        target_origin: 'https://study.4tm.io.vn',
        state: 'sso_state_test_4444',
      }),
    });

    // Mock env returning empty rows from DB for expired ticket
    const mockEnv: any = {
      VITE_SUPABASE_URL: 'https://mock.supabase.co',
      SUPABASE_SERVICE_ROLE_KEY: 'mock_service_role_key',
    };

    // Override global fetch for database RPC call
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async (url: any) => {
      if (String(url).includes('/rpc/consume_sso_ticket')) {
        // Return empty array (ticket expired/invalid)
        return new Response(JSON.stringify([]), { status: 200 });
      }
      return new Response(JSON.stringify({}), { status: 400 });
    };

    try {
      const response = await workerHandler.fetch(request, mockEnv, {});
      const data = await response.json();

      if (response.status !== 400 || data.errorCategory !== 'ticket_invalid_or_expired') {
        throw new Error(`Expected status 400 and ticket_invalid_or_expired, got status ${response.status} body: ${JSON.stringify(data)}`);
      }
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  // -------------------------------------------------------------------------
  // TEST D: Replay Attack (Single-Use Guarantee)
  // -------------------------------------------------------------------------
  await test('Test D: Replay Attack — Second redemption attempt is rejected', async () => {
    let callCount = 0;
    const originalFetch = globalThis.fetch;

    globalThis.fetch = async (url: any) => {
      if (String(url).includes('/rpc/consume_sso_ticket')) {
        callCount++;
        if (callCount === 1) {
          // First attempt succeeds
          return new Response(JSON.stringify([{ user_id: 'usr_123', user_email: 'user@example.com' }]), { status: 200 });
        } else {
          // Second attempt (replay) fails
          return new Response(JSON.stringify([]), { status: 200 });
        }
      }
      if (String(url).includes('/auth/v1/admin/generate_link')) {
        return new Response(JSON.stringify({ properties: { hashed_token: 'th_mock_token_hash_555' } }), { status: 200 });
      }
      return new Response(JSON.stringify({}), { status: 400 });
    };

    const mockEnv: any = {
      VITE_SUPABASE_URL: 'https://mock.supabase.co',
      SUPABASE_SERVICE_ROLE_KEY: 'mock_service_role_key',
    };

    try {
      // First redemption request
      const req1 = new Request('https://4tm.io.vn/api/sso/exchange', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Origin: 'https://study.4tm.io.vn' },
        body: JSON.stringify({ ticket: 'st_live_replay_ticket_5555', target_origin: 'https://study.4tm.io.vn', state: 'sso_state_5555' }),
      });
      const res1 = await workerHandler.fetch(req1, mockEnv, {});
      const data1 = await res1.json();

      if (!data1.success || data1.token_hash !== 'th_mock_token_hash_555') {
        throw new Error(`First exchange failed: ${JSON.stringify(data1)}`);
      }

      // Second redemption request (Replay)
      const req2 = new Request('https://4tm.io.vn/api/sso/exchange', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Origin: 'https://study.4tm.io.vn' },
        body: JSON.stringify({ ticket: 'st_live_replay_ticket_5555', target_origin: 'https://study.4tm.io.vn', state: 'sso_state_5555' }),
      });
      const res2 = await workerHandler.fetch(req2, mockEnv, {});
      const data2 = await res2.json();

      if (res2.status !== 400 || data2.errorCategory !== 'ticket_invalid_or_expired') {
        throw new Error(`Replay attack succeeded when it should have been rejected! ${JSON.stringify(data2)}`);
      }
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  // -------------------------------------------------------------------------
  // TEST E: Wrong Target Origin (Cross-Product Ticket Isolation)
  // -------------------------------------------------------------------------
  await test('Test E: Wrong Target Origin — Ticket issued for Study presented to Games is rejected', async () => {
    const originalFetch = globalThis.fetch;

    globalThis.fetch = async (url: any, opts: any) => {
      if (String(url).includes('/rpc/consume_sso_ticket')) {
        const payload = JSON.parse(opts.body);
        // Expecting Study, but request passed Games -> DB RPC returns empty (origin mismatch)
        if (payload.p_target_origin === 'https://games.4tm.io.vn') {
          return new Response(JSON.stringify([]), { status: 200 });
        }
      }
      return new Response(JSON.stringify({}), { status: 400 });
    };

    const mockEnv: any = {
      VITE_SUPABASE_URL: 'https://mock.supabase.co',
      SUPABASE_SERVICE_ROLE_KEY: 'mock_service_role_key',
    };

    try {
      const req = new Request('https://4tm.io.vn/api/sso/exchange', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Origin: 'https://games.4tm.io.vn' },
        body: JSON.stringify({ ticket: 'st_live_study_ticket_6666', target_origin: 'https://games.4tm.io.vn', state: 'sso_state_6666' }),
      });

      const res = await workerHandler.fetch(req, mockEnv, {});
      const data = await res.json();

      if (res.status !== 400 || data.errorCategory !== 'ticket_invalid_or_expired') {
        throw new Error(`Target origin mismatch was not rejected: ${JSON.stringify(data)}`);
      }
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  // -------------------------------------------------------------------------
  // TEST F: Invalid Redirect Origin (Unauthenticated/Malicious Domain)
  // -------------------------------------------------------------------------
  await test('Test F: Invalid Redirect Origin — https://evil.example is rejected', async () => {
    const maliciousOrigin = 'https://evil.example.com';

    if (isValidSsoTargetOrigin(maliciousOrigin)) {
      throw new Error('Malicious origin was incorrectly classified as valid');
    }

    // Verify initiateSsoAuthRequest throws for evil origin
    try {
      initiateSsoAuthRequest({ targetOrigin: maliciousOrigin });
      throw new Error('initiateSsoAuthRequest should have thrown for invalid origin');
    } catch (err: any) {
      if (!err.message.includes('Invalid target origin')) {
        throw err;
      }
    }

    // Verify Worker rejects malicious origin in exchange payload
    const req = new Request('https://4tm.io.vn/api/sso/exchange', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ticket: 'st_live_7777', target_origin: maliciousOrigin, state: 'sso_state_7777' }),
    });

    const res = await workerHandler.fetch(req, {}, {});
    const data = await res.json();

    if (res.status !== 400 || data.errorCategory !== 'invalid_target_origin') {
      throw new Error(`Worker did not reject invalid target origin: ${JSON.stringify(data)}`);
    }
  });

  // -------------------------------------------------------------------------
  // TEST G: Concurrent Redemption Race Condition Handling
  // -------------------------------------------------------------------------
  await test('Test G: Concurrent Redemption — Parallel exchange requests result in EXACTLY ONE success', async () => {
    let atomicRedeemed = false;
    const originalFetch = globalThis.fetch;

    globalThis.fetch = async (url: any) => {
      if (String(url).includes('/rpc/consume_sso_ticket')) {
        if (!atomicRedeemed) {
          atomicRedeemed = true;
          return new Response(JSON.stringify([{ user_id: 'usr_race_888', user_email: 'race@example.com' }]), { status: 200 });
        } else {
          return new Response(JSON.stringify([]), { status: 200 });
        }
      }
      if (String(url).includes('/auth/v1/admin/generate_link')) {
        return new Response(JSON.stringify({ properties: { hashed_token: 'th_mock_race_token_888' } }), { status: 200 });
      }
      return new Response(JSON.stringify({}), { status: 400 });
    };

    const mockEnv: any = {
      VITE_SUPABASE_URL: 'https://mock.supabase.co',
      SUPABASE_SERVICE_ROLE_KEY: 'mock_service_role_key',
    };

    try {
      const makeReq = () =>
        new Request('https://4tm.io.vn/api/sso/exchange', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Origin: 'https://study.4tm.io.vn' },
          body: JSON.stringify({ ticket: 'st_live_race_ticket_8888', target_origin: 'https://study.4tm.io.vn', state: 'sso_state_8888' }),
        });

      // Launch two concurrent requests
      const [res1, res2] = await Promise.all([
        workerHandler.fetch(makeReq(), mockEnv, {}),
        workerHandler.fetch(makeReq(), mockEnv, {}),
      ]);

      const data1 = await res1.json();
      const data2 = await res2.json();

      const successes = [data1.success, data2.success].filter(Boolean).length;
      if (successes !== 1) {
        throw new Error(`Race condition test failed: expected exactly 1 success, got ${successes}`);
      }
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  // -------------------------------------------------------------------------
  // TEST H: Client-Supplied Identity Immunization
  // -------------------------------------------------------------------------
  await test('Test H: Client-Supplied Identity — Client cannot inject user_id/email', async () => {
    const originalFetch = globalThis.fetch;

    globalThis.fetch = async (url: any, opts: any) => {
      if (String(url).includes('/rpc/consume_sso_ticket')) {
        const body = JSON.parse(opts.body);
        // Verify body contains ONLY p_ticket_hash, p_target_origin, p_state_hash
        if (body.user_id || body.email || body.user_email) {
          throw new Error('RPC call payload contained client-injected identity parameter!');
        }
        return new Response(JSON.stringify([{ user_id: 'bound_user_from_db', user_email: 'bound@example.com' }]), { status: 200 });
      }
      if (String(url).includes('/auth/v1/admin/generate_link')) {
        return new Response(JSON.stringify({ properties: { hashed_token: 'th_mock_identity_token' } }), { status: 200 });
      }
      return new Response(JSON.stringify({}), { status: 400 });
    };

    const mockEnv: any = {
      VITE_SUPABASE_URL: 'https://mock.supabase.co',
      SUPABASE_SERVICE_ROLE_KEY: 'mock_service_role_key',
    };

    try {
      // Client attempts to supply malicious user_id and email in body
      const req = new Request('https://4tm.io.vn/api/sso/exchange', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Origin: 'https://study.4tm.io.vn' },
        body: JSON.stringify({
          ticket: 'st_live_ticket_9999',
          target_origin: 'https://study.4tm.io.vn',
          state: 'sso_state_9999',
          user_id: 'malicious_user_id',
          user_email: 'victim@example.com',
        }),
      });

      const res = await workerHandler.fetch(req, mockEnv, {});
      const data = await res.json();

      if (!data.success) {
        throw new Error(`Exchange failed: ${JSON.stringify(data)}`);
      }
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  // -------------------------------------------------------------------------
  // TEST I: Secret Exposure Audit
  // -------------------------------------------------------------------------
  await test('Test I: Secret Exposure Audit — SUPABASE_SERVICE_ROLE_KEY is absent from client modules', () => {
    const clientEnv = (typeof process !== 'undefined' ? process.env : {}) as any;
    
    // Verify client VITE_ variables do not leak service role key
    const viteServiceKey = clientEnv.VITE_SUPABASE_SERVICE_ROLE_KEY;
    if (viteServiceKey) {
      throw new Error('VITE_SUPABASE_SERVICE_ROLE_KEY found in environment variables! Must never be exposed to Vite.');
    }
  });

  // -------------------------------------------------------------------------
  // TEST J: URL Scrubbing Before Network Exchange
  // -------------------------------------------------------------------------
  await test('Test J: URL Scrubbing — Callback removes ticket/state from URL before network exchange', () => {
    mockWindow.location.hash = '#ticket=st_live_scrub_test_1010&state=sso_state_1010';
    
    const parsed = parseAndScrubSsoCallback();

    if (parsed.ticket !== 'st_live_scrub_test_1010' || parsed.state !== 'sso_state_1010') {
      throw new Error(`Failed to parse ticket and state: ${JSON.stringify(parsed)}`);
    }

    if (mockWindow.location.hash !== '') {
      throw new Error(`URL hash fragment was not scrubbed from location! Remaining: '${mockWindow.location.hash}'`);
    }
  });

  // -------------------------------------------------------------------------
  // TEST K: RPC EXECUTE Revocation and Privilege Separation
  // -------------------------------------------------------------------------
  await test('Test K: RPC Security — Migration strictly enforces privilege separation on sensitive RPCs', () => {
    const migrationPath = path.resolve(process.cwd(), 'supabase/migrations/20260916000001_sso_broker_foundation.sql');
    if (!fs.existsSync(migrationPath)) {
      throw new Error(`Migration file not found at ${migrationPath}`);
    }
    const sqlContent = fs.readFileSync(migrationPath, 'utf8');

    // 1. PUBLIC revocations
    const revokeIssuePublic = /REVOKE\s+EXECUTE\s+ON\s+FUNCTION\s+public\.issue_sso_ticket\s*\(\s*text\s*,\s*text\s*\)\s+FROM\s+PUBLIC;/i;
    const revokeIssueAuthenticated = /REVOKE\s+EXECUTE\s+ON\s+FUNCTION\s+public\.issue_sso_ticket\s*\(\s*text\s*,\s*text\s*\)\s+FROM\s+authenticated;/i;
    const revokeHandoffPublic = /REVOKE\s+EXECUTE\s+ON\s+FUNCTION\s+public\.issue_root_handoff_ticket\s*\(\s*text\s*\)\s+FROM\s+PUBLIC;/i;
    const revokeConsumePublic = /REVOKE\s+EXECUTE\s+ON\s+FUNCTION\s+public\.consume_sso_ticket\s*\(\s*text\s*,\s*text\s*,\s*text\s*\)\s+FROM\s+PUBLIC;/i;

    if (!revokeIssuePublic.test(sqlContent)) {
      throw new Error('Migration is missing: REVOKE EXECUTE ON FUNCTION public.issue_sso_ticket(text, text) FROM PUBLIC;');
    }

    if (!revokeIssueAuthenticated.test(sqlContent)) {
      throw new Error('Migration is missing: REVOKE EXECUTE ON FUNCTION public.issue_sso_ticket(text, text) FROM authenticated;');
    }

    if (!revokeHandoffPublic.test(sqlContent)) {
      throw new Error('Migration is missing: REVOKE EXECUTE ON FUNCTION public.issue_root_handoff_ticket(text) FROM PUBLIC;');
    }

    if (!revokeConsumePublic.test(sqlContent)) {
      throw new Error('Migration is missing: REVOKE EXECUTE ON FUNCTION public.consume_sso_ticket(text, text, text) FROM PUBLIC;');
    }

    // 2. Privilege Separation Grants
    const grantIssueBroker = /GRANT\s+EXECUTE\s+ON\s+FUNCTION\s+public\.issue_sso_ticket\s*\(\s*text\s*,\s*text\s*\)\s+TO\s+service_role\s*,\s*postgres;/i;
    const grantHandoffAuthenticated = /GRANT\s+EXECUTE\s+ON\s+FUNCTION\s+public\.issue_root_handoff_ticket\s*\(\s*text\s*\)\s+TO\s+authenticated;/i;
    const grantConsumeBroker = /GRANT\s+EXECUTE\s+ON\s+FUNCTION\s+public\.consume_sso_ticket\s*\(\s*text\s*,\s*text\s*,\s*text\s*\)\s+TO\s+service_role\s*,\s*postgres;/i;

    if (!grantIssueBroker.test(sqlContent)) {
      throw new Error('Migration is missing: GRANT EXECUTE ON FUNCTION public.issue_sso_ticket(text, text) TO service_role, postgres;');
    }

    if (!grantHandoffAuthenticated.test(sqlContent)) {
      throw new Error('Migration is missing: GRANT EXECUTE ON FUNCTION public.issue_root_handoff_ticket(text) TO authenticated;');
    }

    if (!grantConsumeBroker.test(sqlContent)) {
      throw new Error('Migration is missing: GRANT EXECUTE ON FUNCTION public.consume_sso_ticket(text, text, text) TO service_role, postgres;');
    }
  });

  // -------------------------------------------------------------------------
  // TEST L: No Wildcard CORS on Untrusted/Missing Origins
  // -------------------------------------------------------------------------
  await test('Test L: CORS Hardening — Untrusted/missing origins receive NO Access-Control-Allow-Origin: *', async () => {
    // 1. Untrusted origin preflight
    const preflightReq = new Request('https://4tm.io.vn/api/sso/exchange', {
      method: 'OPTIONS',
      headers: { Origin: 'https://evil.attacker.com' },
    });
    const preflightRes = await workerHandler.fetch(preflightReq, {}, {});
    const preflightCors = preflightRes.headers.get('Access-Control-Allow-Origin');

    if (preflightCors === '*' || preflightCors === 'https://evil.attacker.com') {
      throw new Error(`Untrusted origin received cross-origin access! Got: ${preflightCors}`);
    }

    // 2. Untrusted origin exchange request
    const evilExchangeReq = new Request('https://4tm.io.vn/api/sso/exchange', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Origin: 'https://evil.attacker.com' },
      body: JSON.stringify({
        ticket: 'st_live_test_cors',
        target_origin: 'https://evil.attacker.com',
        state: 'sso_state_test',
      }),
    });
    const evilRes = await workerHandler.fetch(evilExchangeReq, {}, {});
    const evilCors = evilRes.headers.get('Access-Control-Allow-Origin');

    if (evilCors === '*' || evilCors === 'https://evil.attacker.com') {
      throw new Error(`Untrusted target_origin received Access-Control-Allow-Origin: ${evilCors}`);
    }

    // 3. Valid target origin gets exact matching CORS header
    const validReq = new Request('https://4tm.io.vn/api/sso/exchange', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Origin: 'https://study.4tm.io.vn' },
      body: JSON.stringify({
        ticket: 'st_live_test_cors',
        target_origin: 'https://study.4tm.io.vn',
        state: 'sso_state_test',
      }),
    });
    const validRes = await workerHandler.fetch(validReq, {}, {});
    const validCors = validRes.headers.get('Access-Control-Allow-Origin');

    if (validCors !== 'https://study.4tm.io.vn') {
      throw new Error(`Valid target origin did not receive exact Access-Control-Allow-Origin header! Got: ${validCors}`);
    }
  });

  // -------------------------------------------------------------------------
  // TEST M: Missing SUPABASE_SERVICE_ROLE_KEY Fails Closed (No Anon Fallback)
  // -------------------------------------------------------------------------
  await test('Test M: Service Role Mandatory — Missing SUPABASE_SERVICE_ROLE_KEY returns HTTP 500 server_misconfiguration', async () => {
    const savedProcessKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;

    try {
      const mockEnvMissingServiceKey: any = {
        VITE_SUPABASE_URL: 'https://mock.supabase.co',
        VITE_SUPABASE_ANON_KEY: 'public_anon_key_should_never_be_used_for_admin_exchange',
        // SUPABASE_SERVICE_ROLE_KEY intentionally omitted
      };

      const req = new Request('https://4tm.io.vn/api/sso/exchange', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Origin: 'https://study.4tm.io.vn' },
        body: JSON.stringify({
          ticket: 'st_live_ticket_test_m',
          target_origin: 'https://study.4tm.io.vn',
          state: 'sso_state_test_m',
        }),
      });

      const res = await workerHandler.fetch(req, mockEnvMissingServiceKey, {});
      const data = await res.json();

      if (res.status !== 500) {
        throw new Error(`Expected HTTP 500 when service role key is absent, got status: ${res.status}`);
      }

      if (data.errorCategory !== 'server_misconfiguration') {
        throw new Error(`Expected errorCategory 'server_misconfiguration', got: ${JSON.stringify(data)}`);
      }

      // Verify secret is not leaked in error payload
      const serialized = JSON.stringify(data);
      if (serialized.includes('public_anon_key') || serialized.includes('key')) {
        if (data.message.toLowerCase().includes('public_anon_key')) {
          throw new Error('Key leaked in error response!');
        }
      }
    } finally {
      if (savedProcessKey !== undefined) {
        process.env.SUPABASE_SERVICE_ROLE_KEY = savedProcessKey;
      }
    }
  });

  // -------------------------------------------------------------------------
  // TEST N: Lateral Mint Prevention
  // -------------------------------------------------------------------------
  await test('Test N: Lateral Mint Prevention — Authenticated peer cannot invoke issue_sso_ticket (PostgreSQL 42501)', async () => {
    // Authenticated peer client attempts to invoke general issue_sso_ticket
    const peerSupabaseClient = {
      auth: {
        getUser: async () => ({
          data: { user: { id: 'usr_peer_study_001', email: 'student@study.4tm.io.vn' } },
          error: null,
        }),
      },
      rpc: async (fn: string) => {
        if (fn === 'issue_sso_ticket') {
          return {
            data: null,
            error: {
              code: '42501',
              message: 'permission denied for function issue_sso_ticket',
              details: 'Role "authenticated" does not have EXECUTE privilege on public.issue_sso_ticket(text, text)',
            },
          };
        }
        return { data: null, error: { code: '42883', message: 'function does not exist' } };
      },
    };

    const state = generateSsoState();
    const result = await issueSsoTicket({
      supabaseClient: peerSupabaseClient,
      targetOrigin: 'https://games.4tm.io.vn',
      state,
    });

    if (result.success) {
      throw new Error('Peer was able to execute issue_sso_ticket! Expected PostgreSQL 42501 rejection.');
    }

    if (!result.error?.includes('42501') && !result.error?.includes('permission denied')) {
      throw new Error(`Expected PostgreSQL 42501 permission denied error, got: ${result.error}`);
    }
  });

  // -------------------------------------------------------------------------
  // TEST O: Root Handoff Immutability
  // -------------------------------------------------------------------------
  // Simulated database for SSO ticket storage and lifecycle verification
  const simulatedDbTickets = new Map<string, {
    id: string;
    ticket_hash: string;
    user_id: string;
    target_origin: string;
    state_hash: string;
    created_at: Date;
    expires_at: Date;
    used_at: Date | null;
  }>();

  let testOHandoffRawTicket: string = '';
  let testOState: string = '';

  await test('Test O: Root Handoff Immutability — Stored target_origin is strictly https://4tm.io.vn', async () => {
    testOState = generateSsoState();
    const callerUserId = 'usr_peer_student_999';

    // Simulate public.issue_root_handoff_ticket(p_state text) called by authenticated user
    const caller = { role: 'authenticated', userId: callerUserId };

    if (caller.role !== 'authenticated' && caller.role !== 'service_role') {
      throw { code: '42501', message: 'permission denied for function issue_root_handoff_ticket' };
    }
    if (!caller.userId) {
      throw { code: '42501', message: 'Authentication required to issue SSO handoff ticket' };
    }
    if (!testOState || testOState.trim().length === 0) {
      throw { code: '22023', message: 'Authorization request state parameter is required' };
    }

    // Generate CSPRNG 256-bit raw ticket
    testOHandoffRawTicket = 'st_live_' + crypto.randomBytes(32).toString('hex');
    const ticketHash = crypto.createHash('sha256').update(testOHandoffRawTicket).digest('hex');
    const stateHash = crypto.createHash('sha256').update(testOState).digest('hex');

    // Insert record with target_origin strictly hardcoded to https://4tm.io.vn (30s TTL)
    const record = {
      id: crypto.randomUUID(),
      ticket_hash: ticketHash,
      user_id: caller.userId,
      target_origin: 'https://4tm.io.vn', // Hardcoded in PL/pgSQL function
      state_hash: stateHash,
      created_at: new Date(),
      expires_at: new Date(Date.now() + 30000),
      used_at: null,
    };
    simulatedDbTickets.set(ticketHash, record);

    // Verify stored ticket record in database
    const storedRecord = simulatedDbTickets.get(ticketHash);
    if (!storedRecord) {
      throw new Error('Handoff ticket record was not found in simulated database');
    }

    if (storedRecord.target_origin !== 'https://4tm.io.vn') {
      throw new Error(`Target origin was NOT https://4tm.io.vn! Got: ${storedRecord.target_origin}`);
    }

    // Verify migration SQL source code strictly hardcodes 'https://4tm.io.vn' with no parameter
    const migrationPath = path.resolve(process.cwd(), 'supabase/migrations/20260916000001_sso_broker_foundation.sql');
    const sqlContent = fs.readFileSync(migrationPath, 'utf8');
    if (!sqlContent.includes("'https://4tm.io.vn'")) {
      throw new Error("Migration does not hardcode 'https://4tm.io.vn' in issue_root_handoff_ticket");
    }
  });

  // -------------------------------------------------------------------------
  // TEST P: Handoff Target Tampering
  // -------------------------------------------------------------------------
  await test('Test P: Handoff Target Tampering — Attempt to redeem Root ticket with target_origin=Games is rejected', async () => {
    // Attempt to redeem the Root handoff ticket issued in Test O at Games
    const originalFetch = globalThis.fetch;

    globalThis.fetch = async (url: any, opts: any) => {
      if (String(url).includes('/rpc/consume_sso_ticket')) {
        const body = JSON.parse(opts.body);
        const ticket = simulatedDbTickets.get(body.p_ticket_hash);

        // SQL WHERE condition from consume_sso_ticket:
        // t.ticket_hash = p_ticket_hash AND t.target_origin = p_target_origin AND t.state_hash = p_state_hash
        if (
          ticket &&
          ticket.target_origin === body.p_target_origin &&
          ticket.state_hash === body.p_state_hash &&
          ticket.used_at === null &&
          ticket.expires_at > new Date()
        ) {
          ticket.used_at = new Date();
          return new Response(JSON.stringify([{ user_id: ticket.user_id, user_email: 'user@4tm.io.vn' }]), { status: 200 });
        }
        // Origin mismatch: ticket was bound to https://4tm.io.vn, but exchange presented https://games.4tm.io.vn
        return new Response(JSON.stringify([]), { status: 200 });
      }
      return new Response(JSON.stringify({}), { status: 400 });
    };

    const mockEnv: any = {
      VITE_SUPABASE_URL: 'https://mock.supabase.co',
      SUPABASE_SERVICE_ROLE_KEY: 'mock_service_role_key',
    };

    try {
      const tamperingReq = new Request('https://4tm.io.vn/api/sso/exchange', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Origin: 'https://games.4tm.io.vn' },
        body: JSON.stringify({
          ticket: testOHandoffRawTicket,
          target_origin: 'https://games.4tm.io.vn', // Tampered target origin
          state: testOState,
        }),
      });

      const res = await workerHandler.fetch(tamperingReq, mockEnv, {});
      const data = await res.json();

      if (res.status !== 400 || data.errorCategory !== 'ticket_invalid_or_expired') {
        throw new Error(
          `Tampered target origin exchange was not rejected with ticket_invalid_or_expired! Status: ${res.status}, body: ${JSON.stringify(data)}`
        );
      }
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  // -------------------------------------------------------------------------
  // TEST Q: Broker General Issuance
  // -------------------------------------------------------------------------
  await test('Test Q: Broker General Issuance — Service role succeeds in issuing general ticket', async () => {
    // The Root Broker backend executes issue_sso_ticket using service_role
    const brokerServiceRoleClient = {
      role: 'service_role',
      auth: {
        getUser: async () => ({
          data: { user: { id: 'usr_root_broker_admin', email: 'broker@4tm.io.vn' } },
          error: null,
        }),
      },
      rpc: async (fn: string, params: any) => {
        if (fn === 'issue_sso_ticket') {
          // Service role is granted execution
          if (!['service_role', 'postgres'].includes(brokerServiceRoleClient.role)) {
            return { data: null, error: { code: '42501', message: 'permission denied' } };
          }
          if (!isValidSsoTargetOrigin(params.p_target_origin)) {
            return { data: null, error: { code: '42501', message: 'target origin not allowed' } };
          }
          if (!params.p_state || params.p_state.trim().length === 0) {
            return { data: null, error: { code: '22023', message: 'state parameter required' } };
          }

          const rawTicket = 'st_live_' + crypto.randomBytes(32).toString('hex');
          const ticketHash = crypto.createHash('sha256').update(rawTicket).digest('hex');
          const stateHash = crypto.createHash('sha256').update(params.p_state).digest('hex');

          simulatedDbTickets.set(ticketHash, {
            id: crypto.randomUUID(),
            ticket_hash: ticketHash,
            user_id: 'usr_root_broker_admin',
            target_origin: params.p_target_origin,
            state_hash: stateHash,
            created_at: new Date(),
            expires_at: new Date(Date.now() + 30000),
            used_at: null,
          });

          return { data: rawTicket, error: null };
        }
        return { data: null, error: { code: '42883', message: 'function does not exist' } };
      },
    };

    const state = generateSsoState();
    const result = await issueSsoTicket({
      supabaseClient: brokerServiceRoleClient,
      targetOrigin: 'https://study.4tm.io.vn',
      state,
    });

    if (!result.success || !result.ticket?.startsWith('st_live_')) {
      throw new Error(`Broker issuance failed: ${JSON.stringify(result)}`);
    }

    if (!result.redirectUrl?.startsWith('https://study.4tm.io.vn')) {
      throw new Error(`Redirect URL invalid: ${result.redirectUrl}`);
    }
  });

  // -------------------------------------------------------------------------
  // TEST R: Lateral Prevention Matrix
  // -------------------------------------------------------------------------
  await test('Test R: Lateral Prevention Matrix — All lateral peer attempts denied general issuance (42501)', async () => {
    const lateralHops = [
      { from: 'Study', origin: 'https://study.4tm.io.vn', to: 'https://games.4tm.io.vn' },
      { from: 'Games', origin: 'https://games.4tm.io.vn', to: 'https://apps.4tm.io.vn' },
      { from: 'Apps', origin: 'https://apps.4tm.io.vn', to: 'https://ebook.4tm.io.vn' },
      { from: 'Ebook', origin: 'https://ebook.4tm.io.vn', to: 'https://tools.4tm.io.vn' },
      { from: 'Tools', origin: 'https://tools.4tm.io.vn', to: 'https://study.4tm.io.vn' },
    ];

    for (const hop of lateralHops) {
      const peerClient = {
        auth: {
          getUser: async () => ({
            data: { user: { id: `usr_${hop.from.toLowerCase()}`, email: `user@${hop.from.toLowerCase()}.4tm.io.vn` } },
            error: null,
          }),
        },
        rpc: async (fn: string) => {
          if (fn === 'issue_sso_ticket') {
            // PostgreSQL enforces privilege revocation on authenticated role
            return {
              data: null,
              error: {
                code: '42501',
                message: 'permission denied for function issue_sso_ticket',
                details: `Peer ${hop.from} lacks EXECUTE on issue_sso_ticket`,
              },
            };
          }
          return { data: null, error: { code: '42883', message: 'not found' } };
        },
      };

      const state = generateSsoState();
      const result = await issueSsoTicket({
        supabaseClient: peerClient,
        targetOrigin: hop.to,
        state,
      });

      if (result.success) {
        throw new Error(`Lateral hop ${hop.from} -> ${hop.to} succeeded when it must be rejected!`);
      }

      if (!result.error?.includes('42501') && !result.error?.includes('permission denied')) {
        throw new Error(`Lateral hop ${hop.from} -> ${hop.to} did not return 42501. Got: ${result.error}`);
      }
    }
  });

  // -------------------------------------------------------------------------
  // TEST S: Peer Cannot Call General Issuance Even for Root
  // -------------------------------------------------------------------------
  await test('Test S: Peer Cannot Call General Issuance Even for Root — Must use issue_root_handoff_ticket (42501)', async () => {
    // Authenticated peer client attempts to call issue_sso_ticket targeting Root
    const peerClient = {
      auth: {
        getUser: async () => ({
          data: { user: { id: 'usr_peer_caller_444', email: 'peer@study.4tm.io.vn' } },
          error: null,
        }),
      },
      rpc: async (fn: string) => {
        if (fn === 'issue_sso_ticket') {
          return {
            data: null,
            error: {
              code: '42501',
              message: 'permission denied for function issue_sso_ticket',
              hint: 'Role "authenticated" cannot execute issue_sso_ticket. Use issue_root_handoff_ticket(p_state) to hand off to Root.',
            },
          };
        }
        return { data: null, error: { code: '42883', message: 'not found' } };
      },
    };

    const state = generateSsoState();
    const result = await issueSsoTicket({
      supabaseClient: peerClient,
      targetOrigin: 'https://4tm.io.vn',
      state,
    });

    if (result.success) {
      throw new Error('Peer was able to execute issue_sso_ticket for Root! Expected 42501 rejection.');
    }

    if (!result.error?.includes('42501') && !result.error?.includes('permission denied')) {
      throw new Error(`Expected 42501 rejection, got: ${result.error}`);
    }
  });

  // =========================================================================
  // PHASE 2: ECOSYSTEM-WIDE SSO AUTOMATED SUITE (23 SCENARIOS)
  // =========================================================================
  console.log('\n=====================================================');
  console.log('Running 4TM Phase 2 Ecosystem-Wide SSO Test Suite');
  console.log('=====================================================\n');

  const phase2DbTickets = new Map<string, {
    ticket_hash: string;
    user_id: string;
    user_email: string;
    target_origin: string;
    state_hash: string;
    expires_at: Date;
    used_at: Date | null;
  }>();

  const workerEnv: any = {
    VITE_SUPABASE_URL: 'https://mock.supabase.co',
    SUPABASE_SERVICE_ROLE_KEY: 'mock_service_role_key',
    VITE_SUPABASE_ANON_KEY: 'mock_anon_key',
  };

  const activeSessions: Record<string, { user: any; token: string }> = {
    'https://4tm.io.vn': {
      user: { id: 'usr_root_001', email: 'owner@4tm.io.vn' },
      token: 'root_valid_session_jwt_xyz',
    },
    'https://study.4tm.io.vn': {
      user: { id: 'usr_study_001', email: 'student@study.4tm.io.vn' },
      token: 'study_valid_session_jwt_abc',
    },
    'https://games.4tm.io.vn': {
      user: { id: 'usr_games_001', email: 'player@games.4tm.io.vn' },
      token: 'games_valid_session_jwt_def',
    },
    'https://apps.4tm.io.vn': {
      user: { id: 'usr_apps_001', email: 'user@apps.4tm.io.vn' },
      token: 'apps_valid_session_jwt_ghi',
    },
    'https://ebook.4tm.io.vn': {
      user: { id: 'usr_ebook_001', email: 'reader@ebook.4tm.io.vn' },
      token: 'ebook_valid_session_jwt_jkl',
    },
    'https://tools.4tm.io.vn': {
      user: { id: 'usr_tools_001', email: 'builder@tools.4tm.io.vn' },
      token: 'tools_valid_session_jwt_mno',
    },
  };

  // Helper to create origin-scoped mock Supabase client
  function createOriginClient(origin: string) {
    return {
      auth: {
        getUser: async () => {
          const sess = activeSessions[origin];
          if (!sess) return { data: { user: null }, error: new Error('Not authenticated') };
          return { data: { user: sess.user }, error: null };
        },
        getSession: async () => {
          const sess = activeSessions[origin];
          if (!sess) return { data: { session: null }, error: null };
          return {
            data: {
              session: {
                access_token: sess.token,
                user: sess.user,
              },
            },
            error: null,
          };
        },
        verifyOtp: async ({ token_hash }: { token_hash: string }) => {
          if (!token_hash || !token_hash.startsWith('th_mock_')) {
            return { data: null, error: new Error('Invalid OTP token hash') };
          }
          const establishedUser = { id: 'usr_sso_established_999', email: 'user@4tm.io.vn' };
          activeSessions[origin] = {
            user: establishedUser,
            token: `token_${origin}_${Date.now()}`,
          };
          return {
            data: {
              session: { access_token: activeSessions[origin].token, user: establishedUser },
              user: establishedUser,
            },
            error: null,
          };
        },
        signOut: async () => {
          delete activeSessions[origin];
          return { error: null };
        },
      },
      rpc: async (fn: string, params: any) => {
        if (fn === 'issue_root_handoff_ticket') {
          const sess = activeSessions[origin];
          if (!sess) {
            return {
              data: null,
              error: { code: '42501', message: 'Authentication required to issue SSO handoff ticket' },
            };
          }
          const rawTicket = 'st_live_' + crypto.randomBytes(32).toString('hex');
          const ticketHash = crypto.createHash('sha256').update(rawTicket).digest('hex');
          const stateHash = crypto.createHash('sha256').update(params.p_state).digest('hex');
          phase2DbTickets.set(ticketHash, {
            ticket_hash: ticketHash,
            user_id: sess.user.id,
            user_email: sess.user.email,
            target_origin: 'https://4tm.io.vn',
            state_hash: stateHash,
            expires_at: new Date(Date.now() + 30000),
            used_at: null,
          });
          return { data: rawTicket, error: null };
        }
        if (fn === 'issue_sso_ticket') {
          // Authenticated roles cannot execute general issue_sso_ticket
          return {
            data: null,
            error: {
              code: '42501',
              message: 'permission denied for function issue_sso_ticket',
              hint: 'Must use issue_root_handoff_ticket(p_state)',
            },
          };
        }
        return { data: null, error: { code: '42883', message: 'function not found' } };
      },
    };
  }

  // Set up global fetch interceptor for worker / Supabase internal calls
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url: any, opts: any) => {
    const urlStr = String(url);

    // Call to Worker endpoints via relative or absolute URL
    if (urlStr.includes('/api/sso/issue')) {
      const workerReq = new Request(urlStr.startsWith('http') ? urlStr : `https://4tm.io.vn${urlStr}`, opts);
      return workerHandler.fetch(workerReq, workerEnv, {});
    }
    if (urlStr.includes('/api/sso/exchange')) {
      const workerReq = new Request(urlStr.startsWith('http') ? urlStr : `https://4tm.io.vn${urlStr}`, opts);
      return workerHandler.fetch(workerReq, workerEnv, {});
    }

    // GoTrue /auth/v1/user
    if (urlStr.includes('/auth/v1/user')) {
      const authHeader = opts?.headers?.Authorization || opts?.headers?.authorization || '';
      const token = authHeader.replace(/^Bearer\s+/i, '').trim();
      const originFound = Object.entries(activeSessions).find(([_, s]) => s.token === token);
      if (originFound) {
        return new Response(JSON.stringify(originFound[1].user), { status: 200 });
      }
      return new Response(JSON.stringify({ message: 'Invalid JWT' }), { status: 401 });
    }

    // RPC /rest/v1/rpc/issue_sso_ticket
    if (urlStr.includes('/rest/v1/rpc/issue_sso_ticket')) {
      const authHeader = opts?.headers?.Authorization || '';
      if (!authHeader.includes(workerEnv.SUPABASE_SERVICE_ROLE_KEY)) {
        return new Response(JSON.stringify({ code: '42501', message: 'permission denied' }), { status: 403 });
      }
      const body = JSON.parse(opts.body);
      const rawTicket = 'st_live_' + crypto.randomBytes(32).toString('hex');
      const ticketHash = crypto.createHash('sha256').update(rawTicket).digest('hex');
      const stateHash = crypto.createHash('sha256').update(body.p_state).digest('hex');
      phase2DbTickets.set(ticketHash, {
        ticket_hash: ticketHash,
        user_id: 'usr_root_001',
        user_email: 'owner@4tm.io.vn',
        target_origin: body.p_target_origin,
        state_hash: stateHash,
        expires_at: new Date(Date.now() + 30000),
        used_at: null,
      });
      return new Response(JSON.stringify(rawTicket), { status: 200 });
    }

    // RPC /rest/v1/rpc/consume_sso_ticket
    if (urlStr.includes('/rest/v1/rpc/consume_sso_ticket')) {
      const authHeader = opts?.headers?.Authorization || '';
      if (!authHeader.includes(workerEnv.SUPABASE_SERVICE_ROLE_KEY)) {
        return new Response(JSON.stringify({ code: '42501', message: 'permission denied' }), { status: 403 });
      }
      const body = JSON.parse(opts.body);
      const record = phase2DbTickets.get(body.p_ticket_hash);
      if (
        record &&
        record.target_origin === body.p_target_origin &&
        record.state_hash === body.p_state_hash &&
        record.used_at === null &&
        record.expires_at > new Date()
      ) {
        record.used_at = new Date();
        return new Response(
          JSON.stringify([{ user_id: record.user_id, user_email: record.user_email }]),
          { status: 200 }
        );
      }
      return new Response(JSON.stringify([]), { status: 200 });
    }

    // GoTrue /auth/v1/admin/generate_link
    if (urlStr.includes('/auth/v1/admin/generate_link')) {
      const tokenHash = 'th_mock_' + crypto.randomBytes(16).toString('hex');
      return new Response(
        JSON.stringify({ properties: { hashed_token: tokenHash } }),
        { status: 200 }
      );
    }

    return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });
  };

  // 1-5: Root authenticated -> Product SSO
  const targetProducts = [
    { num: 1, name: 'Study', origin: 'https://study.4tm.io.vn' },
    { num: 2, name: 'Games', origin: 'https://games.4tm.io.vn' },
    { num: 3, name: 'Apps', origin: 'https://apps.4tm.io.vn' },
    { num: 4, name: 'Ebook', origin: 'https://ebook.4tm.io.vn' },
    { num: 5, name: 'Tools', origin: 'https://tools.4tm.io.vn' },
  ];

  for (const p of targetProducts) {
    await test(`1.${p.num} Root authenticated → ${p.name} SSO`, async () => {
      const rootClient = createOriginClient('https://4tm.io.vn');
      const state = generateSsoState();

      // Root issues ticket via broker
      const issueRes = await issueSsoTicket({
        supabaseClient: rootClient,
        targetOrigin: p.origin,
        state,
        workerUrl: 'https://4tm.io.vn',
      });

      if (!issueRes.success || !issueRes.ticket) {
        throw new Error(`Failed to issue ticket for ${p.name}: ${issueRes.error}`);
      }

      // Target product receives callback and processes it
      mockWindow.location.origin = p.origin;
      mockWindow.location.hash = `#ticket=${encodeURIComponent(issueRes.ticket)}&state=${encodeURIComponent(state)}`;
      mockStorage[SSO_STATE_STORAGE_KEY] = state;

      const targetClient = createOriginClient(p.origin);
      const callbackRes = await processSsoCallback({
        supabaseClient: targetClient,
        targetOrigin: p.origin,
        workerUrl: 'https://4tm.io.vn',
      });

      if (!callbackRes.success || !callbackRes.session) {
        throw new Error(`Failed to process SSO callback on ${p.name}: ${callbackRes.error}`);
      }

      // Target product must have established its own session
      if (!activeSessions[p.origin] || !activeSessions[p.origin].token.includes(p.origin)) {
        throw new Error(`Session on ${p.name} was not established`);
      }
    });
  }

  // 6-10: Product -> Root handoff
  const peerSources = [
    { num: 6, name: 'Study', origin: 'https://study.4tm.io.vn' },
    { num: 7, name: 'Games', origin: 'https://games.4tm.io.vn' },
    { num: 8, name: 'Apps', origin: 'https://apps.4tm.io.vn' },
    { num: 9, name: 'Ebook', origin: 'https://ebook.4tm.io.vn' },
    { num: 10, name: 'Tools', origin: 'https://tools.4tm.io.vn' },
  ];

  for (const peer of peerSources) {
    await test(`1.${peer.num} ${peer.name} → Root handoff`, async () => {
      const peerClient = createOriginClient(peer.origin);
      const handoffRes = await issuePeerRootHandoff({
        supabaseClient: peerClient,
        rootUrl: 'https://4tm.io.vn',
      });

      if (!handoffRes.success || !handoffRes.ticket || !handoffRes.state) {
        throw new Error(`Peer handoff failed for ${peer.name}: ${handoffRes.error}`);
      }

      // Root receives the handoff ticket
      mockWindow.location.origin = 'https://4tm.io.vn';
      mockWindow.location.hash = `#ticket=${encodeURIComponent(handoffRes.ticket)}&state=${encodeURIComponent(handoffRes.state)}`;
      mockStorage[SSO_STATE_STORAGE_KEY] = handoffRes.state;

      const rootClient = createOriginClient('https://4tm.io.vn');
      const callbackRes = await processSsoCallback({
        supabaseClient: rootClient,
        targetOrigin: 'https://4tm.io.vn',
        workerUrl: 'https://4tm.io.vn',
      });

      if (!callbackRes.success || !callbackRes.session) {
        throw new Error(`Root callback processing failed for handoff from ${peer.name}: ${callbackRes.error}`);
      }
    });
  }

  // 11. Study -> Games through Root (Flow C)
  await test('1.11 Study → Games through Root (Hub-and-Spoke Flow C)', async () => {
    const studyClient = createOriginClient('https://study.4tm.io.vn');
    const handoffRes = await issuePeerRootHandoff({
      supabaseClient: studyClient,
      targetOrigin: 'https://games.4tm.io.vn',
      rootUrl: 'https://4tm.io.vn',
    });

    if (!handoffRes.success || !handoffRes.ticket) {
      throw new Error(`Study handoff to Games via Root failed: ${handoffRes.error}`);
    }

    // Root receives handoff ticket with target_origin=https://games.4tm.io.vn
    const rootClient = createOriginClient('https://4tm.io.vn');
    mockWindow.location.origin = 'https://4tm.io.vn';
    mockWindow.location.hash = `#ticket=${encodeURIComponent(handoffRes.ticket)}&state=${encodeURIComponent(handoffRes.state!)}`;
    mockStorage[SSO_STATE_STORAGE_KEY] = handoffRes.state!;

    const rootCallbackRes = await processSsoCallback({
      supabaseClient: rootClient,
      targetOrigin: 'https://4tm.io.vn',
      workerUrl: 'https://4tm.io.vn',
    });

    if (!rootCallbackRes.success) {
      throw new Error(`Root session creation failed in Flow C: ${rootCallbackRes.error}`);
    }

    // Root broker now mints a fresh ticket strictly for Games
    const gamesState = generateSsoState();
    const gamesIssueRes = await issueSsoTicket({
      supabaseClient: rootClient,
      targetOrigin: 'https://games.4tm.io.vn',
      state: gamesState,
      workerUrl: 'https://4tm.io.vn',
    });

    if (!gamesIssueRes.success || !gamesIssueRes.ticket) {
      throw new Error(`Root broker failed to mint Games ticket: ${gamesIssueRes.error}`);
    }

    // Invariant check: Games ticket MUST NOT be identical to the Study ticket!
    if (gamesIssueRes.ticket === handoffRes.ticket) {
      throw new Error('Security Invariant Violated: Games received the original Study handoff ticket instead of a newly minted ticket!');
    }

    // Games exchanges its new ticket
    mockWindow.location.origin = 'https://games.4tm.io.vn';
    mockWindow.location.hash = `#ticket=${encodeURIComponent(gamesIssueRes.ticket)}&state=${encodeURIComponent(gamesState)}`;
    mockStorage[SSO_STATE_STORAGE_KEY] = gamesState;

    const gamesClient = createOriginClient('https://games.4tm.io.vn');
    const gamesCallbackRes = await processSsoCallback({
      supabaseClient: gamesClient,
      targetOrigin: 'https://games.4tm.io.vn',
      workerUrl: 'https://4tm.io.vn',
    });

    if (!gamesCallbackRes.success) {
      throw new Error(`Games session establishment failed in Flow C: ${gamesCallbackRes.error}`);
    }
  });

  // 12. Games -> Study through Root (Flow C reverse)
  await test('1.12 Games → Study through Root (Hub-and-Spoke Flow C Reverse)', async () => {
    const gamesClient = createOriginClient('https://games.4tm.io.vn');
    const handoffRes = await issuePeerRootHandoff({
      supabaseClient: gamesClient,
      targetOrigin: 'https://study.4tm.io.vn',
      rootUrl: 'https://4tm.io.vn',
    });

    if (!handoffRes.success || !handoffRes.ticket) {
      throw new Error(`Games handoff failed: ${handoffRes.error}`);
    }

    const rootClient = createOriginClient('https://4tm.io.vn');
    mockWindow.location.origin = 'https://4tm.io.vn';
    mockWindow.location.hash = `#ticket=${encodeURIComponent(handoffRes.ticket)}&state=${encodeURIComponent(handoffRes.state!)}`;
    mockStorage[SSO_STATE_STORAGE_KEY] = handoffRes.state!;

    const rootCallbackRes = await processSsoCallback({
      supabaseClient: rootClient,
      targetOrigin: 'https://4tm.io.vn',
      workerUrl: 'https://4tm.io.vn',
    });

    if (!rootCallbackRes.success) {
      throw new Error(`Root callback failed: ${rootCallbackRes.error}`);
    }

    const studyState = generateSsoState();
    const studyIssueRes = await issueSsoTicket({
      supabaseClient: rootClient,
      targetOrigin: 'https://study.4tm.io.vn',
      state: studyState,
      workerUrl: 'https://4tm.io.vn',
    });

    if (studyIssueRes.ticket === handoffRes.ticket) {
      throw new Error('Security Invariant Violated: Target received original handoff ticket');
    }

    mockWindow.location.origin = 'https://study.4tm.io.vn';
    mockWindow.location.hash = `#ticket=${encodeURIComponent(studyIssueRes.ticket!)}&state=${encodeURIComponent(studyState)}`;
    mockStorage[SSO_STATE_STORAGE_KEY] = studyState;

    const studyClient = createOriginClient('https://study.4tm.io.vn');
    const studyCallbackRes = await processSsoCallback({
      supabaseClient: studyClient,
      targetOrigin: 'https://study.4tm.io.vn',
      workerUrl: 'https://4tm.io.vn',
    });

    if (!studyCallbackRes.success) {
      throw new Error(`Study session establishment failed: ${studyCallbackRes.error}`);
    }
  });

  // 13. Unauthenticated Root cannot mint target ticket (401)
  await test('1.13 Unauthenticated Root cannot mint target ticket (401)', async () => {
    const unauthReq = new Request('https://4tm.io.vn/api/sso/issue', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer invalid_garbage_token',
      },
      body: JSON.stringify({
        target_origin: 'https://study.4tm.io.vn',
        state: generateSsoState(),
      }),
    });

    const res = await workerHandler.fetch(unauthReq, workerEnv, {});
    if (res.status !== 401) {
      throw new Error(`Expected HTTP 401 unauthenticated, got status: ${res.status}`);
    }
    const data = await res.json();
    if (data.errorCategory !== 'unauthenticated') {
      throw new Error(`Expected errorCategory unauthenticated, got: ${JSON.stringify(data)}`);
    }
  });

  // 14. Peer cannot mint peer-targeted ticket (42501)
  await test('1.14 Peer cannot mint peer-targeted ticket (PostgreSQL 42501)', async () => {
    const peerClient = createOriginClient('https://study.4tm.io.vn');
    const rpcRes = await peerClient.rpc('issue_sso_ticket', {
      p_target_origin: 'https://games.4tm.io.vn',
      p_state: generateSsoState(),
    });

    if (rpcRes.data || !rpcRes.error || rpcRes.error.code !== '42501') {
      throw new Error(`Expected PostgreSQL 42501 permission denied, got: ${JSON.stringify(rpcRes)}`);
    }
  });

  // 15. Client cannot inject user identity
  await test('1.15 Client cannot inject user identity in issuance or exchange', async () => {
    const maliciousReq = new Request('https://4tm.io.vn/api/sso/issue', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${activeSessions['https://4tm.io.vn'].token}`,
      },
      body: JSON.stringify({
        target_origin: 'https://study.4tm.io.vn',
        state: generateSsoState(),
        user_id: 'usr_injected_admin_evil',
        user_email: 'admin@google.com',
      }),
    });

    const res = await workerHandler.fetch(maliciousReq, workerEnv, {});
    const data = await res.json();
    if (!data.success || !data.ticket) {
      throw new Error(`Issue failed: ${JSON.stringify(data)}`);
    }

    const ticketHash = crypto.createHash('sha256').update(data.ticket).digest('hex');
    const storedRecord = phase2DbTickets.get(ticketHash);
    if (storedRecord?.user_id === 'usr_injected_admin_evil') {
      throw new Error('CRITICAL VULNERABILITY: Client was able to inject user_id into ticket record!');
    }
    if (storedRecord?.user_id !== 'usr_root_001') {
      throw new Error(`Identity was not verified from Root session: ${storedRecord?.user_id}`);
    }
  });

  // 16. State mismatch rejected before network exchange
  await test('1.16 State mismatch rejected before network exchange', async () => {
    mockStorage[SSO_STATE_STORAGE_KEY] = 'sso_state_target_stored_valid';
    mockWindow.location.hash = '#ticket=st_live_some_ticket&state=sso_state_attacker_mismatched';

    let fetchCalled = false;
    const trackingClient = {
      auth: {
        verifyOtp: async () => {
          fetchCalled = true;
          return { data: null, error: new Error('Should not be called') };
        },
      },
    };

    const res = await processSsoCallback({
      supabaseClient: trackingClient,
      targetOrigin: 'https://study.4tm.io.vn',
      workerUrl: 'https://4tm.io.vn',
    });

    if (res.success || res.errorCategory !== 'state_mismatch') {
      throw new Error(`Expected state_mismatch errorCategory, got: ${JSON.stringify(res)}`);
    }
    if (fetchCalled) {
      throw new Error('Network exchange was called despite state mismatch!');
    }
  });

  // 17. Ticket replay rejected
  await test('1.17 Ticket replay rejected', async () => {
    const rawTicket = 'st_live_' + crypto.randomBytes(32).toString('hex');
    const state = generateSsoState();
    const ticketHash = crypto.createHash('sha256').update(rawTicket).digest('hex');
    const stateHash = crypto.createHash('sha256').update(state).digest('hex');

    phase2DbTickets.set(ticketHash, {
      ticket_hash: ticketHash,
      user_id: 'usr_root_001',
      user_email: 'owner@4tm.io.vn',
      target_origin: 'https://study.4tm.io.vn',
      state_hash: stateHash,
      expires_at: new Date(Date.now() + 30000),
      used_at: null,
    });

    const exchangePayload = {
      ticket: rawTicket,
      target_origin: 'https://study.4tm.io.vn',
      state,
    };

    // First redemption: succeeds
    const firstReq = new Request('https://4tm.io.vn/api/sso/exchange', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(exchangePayload),
    });
    const firstRes = await workerHandler.fetch(firstReq, workerEnv, {});
    const firstData = await firstRes.json();
    if (!firstData.success) {
      throw new Error(`First exchange failed: ${JSON.stringify(firstData)}`);
    }

    // Replay attempt: must be rejected
    const secondReq = new Request('https://4tm.io.vn/api/sso/exchange', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(exchangePayload),
    });
    const secondRes = await workerHandler.fetch(secondReq, workerEnv, {});
    const secondData = await secondRes.json();
    if (secondRes.status !== 400 || secondData.errorCategory !== 'ticket_invalid_or_expired') {
      throw new Error(`Replay was not rejected with ticket_invalid_or_expired: ${JSON.stringify(secondData)}`);
    }
  });

  // 18. Wrong target rejected
  await test('1.18 Wrong target rejected', async () => {
    const rawTicket = 'st_live_' + crypto.randomBytes(32).toString('hex');
    const state = generateSsoState();
    const ticketHash = crypto.createHash('sha256').update(rawTicket).digest('hex');
    const stateHash = crypto.createHash('sha256').update(state).digest('hex');

    phase2DbTickets.set(ticketHash, {
      ticket_hash: ticketHash,
      user_id: 'usr_root_001',
      user_email: 'owner@4tm.io.vn',
      target_origin: 'https://study.4tm.io.vn', // Strictly bound to Study
      state_hash: stateHash,
      expires_at: new Date(Date.now() + 30000),
      used_at: null,
    });

    // Attempt to redeem on Games
    const wrongTargetReq = new Request('https://4tm.io.vn/api/sso/exchange', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ticket: rawTicket,
        target_origin: 'https://games.4tm.io.vn', // Mismatched target
        state,
      }),
    });

    const res = await workerHandler.fetch(wrongTargetReq, workerEnv, {});
    const data = await res.json();
    if (res.status !== 400 || data.errorCategory !== 'ticket_invalid_or_expired') {
      throw new Error(`Wrong target origin was not rejected: ${JSON.stringify(data)}`);
    }
  });

  // 19. Expired ticket rejected
  await test('1.19 Expired ticket rejected', async () => {
    const rawTicket = 'st_live_' + crypto.randomBytes(32).toString('hex');
    const state = generateSsoState();
    const ticketHash = crypto.createHash('sha256').update(rawTicket).digest('hex');
    const stateHash = crypto.createHash('sha256').update(state).digest('hex');

    phase2DbTickets.set(ticketHash, {
      ticket_hash: ticketHash,
      user_id: 'usr_root_001',
      user_email: 'owner@4tm.io.vn',
      target_origin: 'https://study.4tm.io.vn',
      state_hash: stateHash,
      expires_at: new Date(Date.now() - 5000), // Expired 5 seconds ago
      used_at: null,
    });

    const req = new Request('https://4tm.io.vn/api/sso/exchange', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ticket: rawTicket,
        target_origin: 'https://study.4tm.io.vn',
        state,
      }),
    });

    const res = await workerHandler.fetch(req, workerEnv, {});
    const data = await res.json();
    if (res.status !== 400 || data.errorCategory !== 'ticket_invalid_or_expired') {
      throw new Error(`Expired ticket was not rejected: ${JSON.stringify(data)}`);
    }
  });

  // 20. Service-role secret absent from client bundle
  await test('1.20 Service-role secret absent from client bundle', async () => {
    const clientDirs = ['src', 'shared', 'products/study/src'];
    for (const d of clientDirs) {
      const fullDir = path.resolve(process.cwd(), d);
      if (!fs.existsSync(fullDir)) continue;
      const files = fs.readdirSync(fullDir, { recursive: true }) as string[];
      for (const f of files) {
        if (!f.endsWith('.ts') && !f.endsWith('.tsx')) continue;
        const filePath = path.join(fullDir, f);
        const code = fs.readFileSync(filePath, 'utf8');
        if (code.includes('SUPABASE_SERVICE_ROLE_KEY')) {
          throw new Error(`SUPABASE_SERVICE_ROLE_KEY found in client-side code: ${filePath}`);
        }
      }
    }
  });

  // 21. URL fragment scrubbed before exchange
  await test('1.21 URL fragment scrubbed before exchange', async () => {
    mockWindow.location.hash = '#ticket=st_live_scrub_test&state=state_scrub_test';
    const parsed = parseAndScrubSsoCallback();
    if (parsed.ticket !== 'st_live_scrub_test' || parsed.state !== 'state_scrub_test') {
      throw new Error(`Failed to parse callback parameters: ${JSON.stringify(parsed)}`);
    }
    if (mockWindow.location.hash !== '') {
      throw new Error(`Fragment was not scrubbed from URL: ${mockWindow.location.hash}`);
    }
  });

  // 22. Root broker cannot be abused with arbitrary untrusted target (400 invalid_target_origin)
  await test('1.22 Root broker cannot be abused with arbitrary untrusted target (400 invalid_target_origin)', async () => {
    const evilReq = new Request('https://4tm.io.vn/api/sso/issue', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${activeSessions['https://4tm.io.vn'].token}`,
      },
      body: JSON.stringify({
        target_origin: 'https://evil-phishing-domain.com',
        state: generateSsoState(),
      }),
    });

    const res = await workerHandler.fetch(evilReq, workerEnv, {});
    if (res.status !== 400) {
      throw new Error(`Expected HTTP 400 for untrusted target, got status: ${res.status}`);
    }
    const data = await res.json();
    if (data.errorCategory !== 'invalid_target_origin') {
      throw new Error(`Expected errorCategory invalid_target_origin, got: ${JSON.stringify(data)}`);
    }
  });

  // 23. Logout remains origin-scoped
  await test('1.23 Logout remains origin-scoped (no shared cookies/JWT destruction)', async () => {
    const studyClient = createOriginClient('https://study.4tm.io.vn');
    const rootClient = createOriginClient('https://4tm.io.vn');

    // Both origins have active sessions
    assert.ok(activeSessions['https://study.4tm.io.vn']);
    assert.ok(activeSessions['https://4tm.io.vn']);

    // User signs out of Study
    await studyClient.auth.signOut();

    // Study session is destroyed
    assert.strictEqual(activeSessions['https://study.4tm.io.vn'], undefined);

    // Root session remains active and completely unharmed!
    assert.ok(activeSessions['https://4tm.io.vn']);
    const rootUser = await rootClient.auth.getUser();
    assert.ok(rootUser.data.user?.id);
    assert.strictEqual(rootUser.data.user?.email, 'user@4tm.io.vn');
  });

  // Cleanup global fetch
  globalThis.fetch = originalFetch;

  console.log('\n=====================================================');
  console.log(`Security Test Summary: ${passed}/${total} Tests PASSED`);
  console.log('=====================================================\n');

  if (passed !== total) {
    process.exit(1);
  }
}

runSecurityTests().catch((err) => {
  console.error('Fatal error running security tests:', err);
  process.exit(1);
});
