export interface Env {
  ASSETS?: {
    fetch: (request: Request | string) => Promise<Response>;
  };
  DATA?: any;
  APP_URL?: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Health check endpoint
    if (url.pathname === '/api/health' || url.pathname === '/health') {
      return new Response(
        JSON.stringify({
          status: 'ok',
          platform: 'Games — 4TM',
          domain: 'games.4tm.io.vn',
          timestamp: new Date().toISOString(),
        }),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Handle CORS preflight for API / games-data requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    // Proxy / direct R2 handler for game packages and assets (e.g. /api/games-data/games/block-puzzle/index.pck)
    if (url.pathname.startsWith('/api/games-data/')) {
      const key = url.pathname.replace(/^\/api\/games-data\//, '');

      // 1. Direct R2 bucket binding if available
      if (env.DATA) {
        try {
          const rangeHeader = request.headers.get('range');
          const object = await env.DATA.get(key, {
            range: request.headers,
            onlyIf: request.headers,
          });

          if (object) {
            const headers = new Headers();
            if (typeof object.writeHttpMetadata === 'function') {
              object.writeHttpMetadata(headers);
            }
            if (object.httpEtag) {
              headers.set('etag', object.httpEtag);
            }
            headers.set('Accept-Ranges', 'bytes');
            headers.set('Access-Control-Allow-Origin', '*');
            headers.set('Access-Control-Expose-Headers', 'Content-Range, Content-Length, Accept-Ranges, etag');
            headers.set('Cache-Control', 'public, max-age=31536000, immutable');

            const status = object.body ? (rangeHeader ? 206 : 200) : 304;
            return new Response(object.body, { status, headers });
          }
        } catch (r2Err) {
          console.warn('[4TM Games Worker] R2 binding get error:', r2Err);
        }
      }

      // 2. Fallback upstream fetch to public R2 CDN with CORS decoration
      try {
        const upstreamUrl = `https://games-data.4tm.io.vn/${key}`;
        const upstreamRes = await fetch(upstreamUrl, {
          headers: request.headers,
          method: request.method,
        });

        const headers = new Headers(upstreamRes.headers);
        headers.set('Access-Control-Allow-Origin', '*');
        headers.set('Access-Control-Expose-Headers', 'Content-Range, Content-Length, Accept-Ranges, etag');

        return new Response(upstreamRes.body, {
          status: upstreamRes.status,
          headers,
        });
      } catch (upstreamErr) {
        return new Response(
          JSON.stringify({ error: 'Failed to retrieve asset from games-data', details: String(upstreamErr) }),
          { status: 502, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
        );
      }
    }

    // Handle WASM request decompression / Content-Encoding
    if (url.pathname.endsWith('.wasm') && env.ASSETS) {
      // First attempt direct ASSETS fetch
      const wasmRes = await env.ASSETS.fetch(request);
      if (wasmRes.ok && wasmRes.status === 200) {
        const headers = new Headers(wasmRes.headers);
        headers.set('Content-Type', 'application/wasm');
        headers.set('Cross-Origin-Resource-Policy', 'cross-origin');
        return new Response(wasmRes.body, { status: 200, headers });
      }

      // If .wasm returned 404, check for pre-compressed .wasm.gz
      const gzUrl = new URL(request.url + '.gz');
      const gzRes = await env.ASSETS.fetch(gzUrl.toString());
      if (gzRes.ok && gzRes.status === 200) {
        const headers = new Headers(gzRes.headers);
        headers.set('Content-Type', 'application/wasm');
        headers.set('Content-Encoding', 'gzip');
        headers.set('Cross-Origin-Resource-Policy', 'cross-origin');
        return new Response(gzRes.body, { status: 200, headers });
      }
    }

    if (env.ASSETS) {
      const response = await env.ASSETS.fetch(request);
      // Ensure cross-origin isolation headers / resource policy on HTML and assets for Godot compatibility
      if (url.pathname.endsWith('.html') || url.pathname.endsWith('/')) {
        const newHeaders = new Headers(response.headers);
        newHeaders.set('Cross-Origin-Resource-Policy', 'cross-origin');
        return new Response(response.body, { status: response.status, headers: newHeaders });
      }
      return response;
    }

    return new Response('Asset binding unavailable', { status: 503 });
  },
};
