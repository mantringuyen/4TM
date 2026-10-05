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

    // Proxy / direct R2 handler for game packages and assets (e.g. /api/games-data/games/block-puzzle/index.pck or /games-data/...)
    if (url.pathname.startsWith('/api/games-data/') || url.pathname.startsWith('/games-data/')) {
      const key = url.pathname.replace(/^\/(?:api\/)?games-data\//, '');
      const isHead = request.method === 'HEAD';

      // 1. Direct R2 bucket binding if available (DATA -> 4tm-games-dev)
      if (env.DATA) {
        try {
          const rangeHeader = request.headers.get('range');
          const getOptions: any = {};
          if (rangeHeader) {
            getOptions.range = request.headers;
          }
          const ifMatch = request.headers.get('if-match');
          const ifNoneMatch = request.headers.get('if-none-match');
          if (ifMatch || ifNoneMatch) {
            getOptions.onlyIf = request.headers;
          }
          const object = await env.DATA.get(key, Object.keys(getOptions).length > 0 ? getOptions : undefined);

          if (object) {
            const headers = new Headers();
            if (typeof object.writeHttpMetadata === 'function') {
              object.writeHttpMetadata(headers);
            }
            if (object.httpEtag) {
              headers.set('etag', object.httpEtag);
            }

            // Ensure essential content headers for PCK / binary asset delivery
            if (!headers.get('Content-Type')) {
              headers.set('Content-Type', 'application/octet-stream');
            }

            headers.set('Accept-Ranges', 'bytes');
            headers.set('Access-Control-Allow-Origin', '*');
            headers.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
            headers.set('Access-Control-Allow-Headers', '*');
            headers.set('Access-Control-Expose-Headers', 'Content-Range, Content-Length, Accept-Ranges, Content-Type, etag');
            headers.set('Cache-Control', 'public, max-age=31536000, immutable');

            // Set accurate Content-Length and Content-Range for 200 vs 206
            let status = 200;
            if (rangeHeader && object.range) {
              status = 206;
              const rangeOffset = (object.range as any).offset ?? 0;
              const rangeLength = (object.range as any).length ?? object.size;
              const rangeEnd = rangeOffset + rangeLength - 1;
              headers.set('Content-Range', `bytes ${rangeOffset}-${rangeEnd}/${object.size}`);
              headers.set('Content-Length', rangeLength.toString());
            } else {
              headers.set('Content-Length', object.size.toString());
            }

            if (isHead) {
              return new Response(null, { status, headers });
            }

            return new Response(object.body, { status, headers });
          }
        } catch (r2Err) {
          console.warn('[4TM Games Worker] R2 binding get error:', r2Err);
        }
      }

      // 2. Fallback upstream fetch to public R2 CDN with CORS & Range decoration
      try {
        const upstreamUrl = `https://games-data.4tm.io.vn/${key}`;
        const upstreamRes = await fetch(upstreamUrl, {
          headers: request.headers,
          method: request.method,
        });

        const headers = new Headers(upstreamRes.headers);
        headers.set('Access-Control-Allow-Origin', '*');
        headers.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
        headers.set('Access-Control-Allow-Headers', '*');
        headers.set('Access-Control-Expose-Headers', 'Content-Range, Content-Length, Accept-Ranges, Content-Type, etag');

        if (!headers.get('Content-Type')) {
          headers.set('Content-Type', 'application/octet-stream');
        }

        return new Response(isHead ? null : upstreamRes.body, {
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
      // 1. Check for pre-compressed .wasm.gz in ASSETS (since only .wasm.gz exists on disk)
      const gzUrl = new URL(request.url + '.gz');
      const gzRes = await env.ASSETS.fetch(gzUrl.toString());
      const gzType = gzRes.headers.get('content-type') || '';
      if (gzRes.ok && gzRes.status === 200 && !gzType.includes('text/html')) {
        const headers = new Headers(gzRes.headers);
        headers.set('Content-Type', 'application/wasm');
        headers.set('Content-Encoding', 'gzip');
        headers.set('Cross-Origin-Resource-Policy', 'cross-origin');
        return new Response(gzRes.body, { status: 200, headers });
      }

      // 2. Direct ASSETS fetch for uncompressed .wasm (verify not SPA HTML fallback)
      const wasmRes = await env.ASSETS.fetch(request);
      const wasmType = wasmRes.headers.get('content-type') || '';
      if (wasmRes.ok && wasmRes.status === 200 && !wasmType.includes('text/html')) {
        const headers = new Headers(wasmRes.headers);
        headers.set('Content-Type', 'application/wasm');
        headers.set('Cross-Origin-Resource-Policy', 'cross-origin');
        return new Response(wasmRes.body, { status: 200, headers });
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
