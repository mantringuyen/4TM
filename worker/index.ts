import { ECOSYSTEM_PRODUCTS_CONFIG, ECOSYSTEM_DOMAIN } from '../src/config/products';
import { isValidSsoTargetOrigin } from '../shared/sso';

export interface Env {
  ASSETS?: {
    fetch: (request: Request | string) => Promise<Response>;
  };
  APP_URL?: string;
  VITE_SUPABASE_URL?: string;
  SUPABASE_URL?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
  VITE_SUPABASE_ANON_KEY?: string;
}

async function sha256Hex(str: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export default {
  async fetch(request: Request, env: Env, _ctx: any): Promise<Response> {
    const url = new URL(request.url);
    const pathname = url.pathname;
    const requestOrigin = request.headers.get('Origin') || '';

    // CORS headers helper
    const getCorsHeaders = (targetOrigin?: string) => {
      const allowedOrigin =
        targetOrigin && isValidSsoTargetOrigin(targetOrigin)
          ? targetOrigin
          : requestOrigin && isValidSsoTargetOrigin(requestOrigin)
          ? requestOrigin
          : '';

      const headers: Record<string, string> = {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-client-info',
      };

      // Exact origin match ONLY: never fall back to '*' for SSO exchange or sensitive routes
      if (allowedOrigin) {
        headers['Access-Control-Allow-Origin'] = allowedOrigin;
      }

      return headers;
    };

    // Handle OPTIONS CORS Preflight for /api/sso/exchange
    if (request.method === 'OPTIONS' && pathname === '/api/sso/exchange') {
      return new Response(null, {
        status: 204,
        headers: getCorsHeaders(),
      });
    }

    // 1. Health check route
    if (pathname === '/api/health' || pathname === '/health') {
      return new Response(
        JSON.stringify({
          status: 'ok',
          platform: '4TM Ecosystem',
          domain: ECOSYSTEM_DOMAIN,
          timestamp: new Date().toISOString(),
        }),
        {
          status: 200,
          headers: getCorsHeaders(),
        }
      );
    }

    // 2. Products API endpoint
    if (pathname === '/api/products') {
      return new Response(
        JSON.stringify({
          domain: ECOSYSTEM_DOMAIN,
          products: ECOSYSTEM_PRODUCTS_CONFIG,
        }),
        {
          status: 200,
          headers: getCorsHeaders(),
        }
      );
    }

    // 3. SSO Ticket Exchange Endpoint: POST /api/sso/exchange
    if (pathname === '/api/sso/exchange' && request.method === 'POST') {
      try {
        const body = await request.json().catch(() => null);
        if (!body || typeof body !== 'object') {
          return new Response(
            JSON.stringify({
              success: false,
              errorCategory: 'invalid_payload',
              message: 'Request body must be a valid JSON object',
            }),
            { status: 400, headers: getCorsHeaders() }
          );
        }

        const { ticket, target_origin, state } = body;

        // 3a. Validate payload parameters
        if (
          !ticket ||
          typeof ticket !== 'string' ||
          !target_origin ||
          typeof target_origin !== 'string' ||
          !state ||
          typeof state !== 'string'
        ) {
          return new Response(
            JSON.stringify({
              success: false,
              errorCategory: 'invalid_payload',
              message: 'Missing required fields: ticket, target_origin, or state',
            }),
            { status: 400, headers: getCorsHeaders(target_origin) }
          );
        }

        // 3b. Validate exact allowed target origin
        if (!isValidSsoTargetOrigin(target_origin)) {
          return new Response(
            JSON.stringify({
              success: false,
              errorCategory: 'invalid_target_origin',
              message: `Target origin '${target_origin}' is not an allowed SSO target origin`,
            }),
            { status: 400, headers: getCorsHeaders(target_origin) }
          );
        }

        // 3c. Calculate SHA-256 hashes of ticket and state
        const ticketHash = await sha256Hex(ticket);
        const stateHash = await sha256Hex(state);

        // 3d. Locate Supabase configuration
        const supabaseUrl = (
          env.VITE_SUPABASE_URL ||
          env.SUPABASE_URL ||
          (typeof process !== 'undefined' ? process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL : '') ||
          ''
        ).replace(/\/+$/, '');

        const serviceRoleKey =
          env.SUPABASE_SERVICE_ROLE_KEY ||
          (typeof process !== 'undefined' ? process.env.SUPABASE_SERVICE_ROLE_KEY : '') ||
          '';

        // SUPABASE_SERVICE_ROLE_KEY is strictly required. Never fall back to anonKey.
        if (!supabaseUrl || !serviceRoleKey) {
          return new Response(
            JSON.stringify({
              success: false,
              errorCategory: 'server_misconfiguration',
              message: 'Supabase service role configuration is missing on SSO broker worker',
            }),
            { status: 500, headers: getCorsHeaders(target_origin) }
          );
        }

        const authKey = serviceRoleKey;

        // 3e. Atomically consume ticket in Supabase database via consume_sso_ticket RPC
        const rpcEndpoint = `${supabaseUrl}/rest/v1/rpc/consume_sso_ticket`;
        const rpcRes = await fetch(rpcEndpoint, {
          method: 'POST',
          headers: {
            apikey: authKey,
            Authorization: `Bearer ${authKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            p_ticket_hash: ticketHash,
            p_target_origin: target_origin,
            p_state_hash: stateHash,
          }),
        });

        if (!rpcRes.ok) {
          return new Response(
            JSON.stringify({
              success: false,
              errorCategory: 'ticket_invalid_or_expired',
              message: 'SSO ticket consumption rejected by database',
            }),
            { status: 400, headers: getCorsHeaders(target_origin) }
          );
        }

        const consumedUsers: Array<{ user_id: string; user_email: string }> = await rpcRes.json();

        if (!Array.isArray(consumedUsers) || consumedUsers.length === 0 || !consumedUsers[0]?.user_email) {
          return new Response(
            JSON.stringify({
              success: false,
              errorCategory: 'ticket_invalid_or_expired',
              message: 'SSO ticket is invalid, expired, already consumed, or origin/state mismatched',
            }),
            { status: 400, headers: getCorsHeaders(target_origin) }
          );
        }

        const userEmail = consumedUsers[0].user_email;

        // 3f. Generate magic link token_hash via Supabase GoTrue Admin API
        const adminEndpoint = `${supabaseUrl}/auth/v1/admin/generate_link`;
        const adminRes = await fetch(adminEndpoint, {
          method: 'POST',
          headers: {
            apikey: authKey,
            Authorization: `Bearer ${authKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'magiclink',
            email: userEmail,
          }),
        });

        if (!adminRes.ok) {
          return new Response(
            JSON.stringify({
              success: false,
              errorCategory: 'generate_link_failed',
              message: 'Failed to generate single-use authentication link for exchanged ticket',
            }),
            { status: 500, headers: getCorsHeaders(target_origin) }
          );
        }

        const adminData = await adminRes.json();
        const tokenHash =
          adminData?.properties?.hashed_token || adminData?.hashed_token || adminData?.token_hash;

        if (!tokenHash || typeof tokenHash !== 'string') {
          return new Response(
            JSON.stringify({
              success: false,
              errorCategory: 'token_hash_missing',
              message: 'Admin link generation response did not contain a valid token_hash',
            }),
            { status: 500, headers: getCorsHeaders(target_origin) }
          );
        }

        // Return 200 OK with token_hash for client verifyOtp consumption
        return new Response(
          JSON.stringify({
            success: true,
            token_hash: tokenHash,
          }),
          { status: 200, headers: getCorsHeaders(target_origin) }
        );
      } catch (err: any) {
        return new Response(
          JSON.stringify({
            success: false,
            errorCategory: 'internal_error',
            message: 'An unexpected error occurred during SSO ticket exchange',
          }),
          { status: 500, headers: getCorsHeaders() }
        );
      }
    }

    // 4. Static assets / SPA fallback
    if (env.ASSETS && typeof env.ASSETS.fetch === 'function') {
      return await env.ASSETS.fetch(request);
    }

    return new Response('Not Found', { status: 404 });
  },
};
