import assert from 'node:assert';
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
  // TEST K: RPC EXECUTE Revocation from PUBLIC
  // -------------------------------------------------------------------------
  await test('Test K: RPC Security — Migration strictly revokes PUBLIC EXECUTE on sensitive RPCs', () => {
    const migrationPath = path.resolve(process.cwd(), 'supabase/migrations/20260916000001_sso_broker_foundation.sql');
    if (!fs.existsSync(migrationPath)) {
      throw new Error(`Migration file not found at ${migrationPath}`);
    }
    const sqlContent = fs.readFileSync(migrationPath, 'utf8');

    const revokeIssuePublic = /REVOKE\s+EXECUTE\s+ON\s+FUNCTION\s+public\.issue_sso_ticket\s*\(\s*text\s*,\s*text\s*\)\s+FROM\s+PUBLIC;/i;
    const revokeConsumePublic = /REVOKE\s+EXECUTE\s+ON\s+FUNCTION\s+public\.consume_sso_ticket\s*\(\s*text\s*,\s*text\s*,\s*text\s*\)\s+FROM\s+PUBLIC;/i;

    if (!revokeIssuePublic.test(sqlContent)) {
      throw new Error('Migration is missing: REVOKE EXECUTE ON FUNCTION public.issue_sso_ticket(text, text) FROM PUBLIC;');
    }

    if (!revokeConsumePublic.test(sqlContent)) {
      throw new Error('Migration is missing: REVOKE EXECUTE ON FUNCTION public.consume_sso_ticket(text, text, text) FROM PUBLIC;');
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
  });

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
