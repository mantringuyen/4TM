export interface Env {
  ASSETS?: {
    fetch: (request: Request | string) => Promise<Response>;
  };
  DATA?: any;
  APP_URL?: string;
}

interface PeekedStream {
  bytes: Uint8Array;
  stream: ReadableStream<Uint8Array>;
  cancel: (reason?: any) => Promise<void>;
}

async function peekStreamBytes(
  stream: ReadableStream<Uint8Array>,
  minBytes: number
): Promise<PeekedStream> {
  const reader = stream.getReader();
  const bufferedChunks: Uint8Array[] = [];
  let totalBytes = 0;

  try {
    while (totalBytes < minBytes) {
      const { value, done } = await reader.read();
      if (done) break;
      if (value && value.length > 0) {
        bufferedChunks.push(value);
        totalBytes += value.length;
      }
    }
  } catch (err) {
    reader.releaseLock();
    throw err;
  }

  const combined = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of bufferedChunks) {
    combined.set(chunk, offset);
    offset += chunk.length;
  }

  let chunkIndex = 0;
  const reconstructedStream = new ReadableStream<Uint8Array>({
    async pull(controller) {
      if (chunkIndex < bufferedChunks.length) {
        controller.enqueue(bufferedChunks[chunkIndex++]);
        return;
      }
      try {
        const { value, done } = await reader.read();
        if (done) {
          controller.close();
        } else {
          controller.enqueue(value);
        }
      } catch (err) {
        controller.error(err);
      }
    },
    cancel(reason) {
      return reader.cancel(reason);
    },
  });

  return {
    bytes: combined,
    stream: reconstructedStream,
    cancel: (reason?: any) => reader.cancel(reason),
  };
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

    // Proxy / direct R2 handler for game packages and assets (e.g. /games/block-puzzle/index.pck, /api/games-data/..., /games-data/...)
    const isPckRequest = url.pathname.endsWith('.pck');
    const isGamesDataRequest = url.pathname.startsWith('/api/games-data/') || url.pathname.startsWith('/games-data/');

    if (isGamesDataRequest || isPckRequest) {
      let rawKey = url.pathname.replace(/^\/(?:api\/)?games-data\//, '').replace(/^\//, '');
      const candidateKeys: string[] = [];
      if (rawKey.startsWith('games/')) {
        candidateKeys.push(rawKey);
        candidateKeys.push(rawKey.replace(/^games\//, ''));
      } else {
        candidateKeys.push(`games/${rawKey}`);
        candidateKeys.push(rawKey);
      }

      const isHead = request.method === 'HEAD';

      // 1. Direct R2 bucket binding if available (DATA -> 4tm-games production bucket)
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

          let object: any = null;
          for (const key of candidateKeys) {
            object = await env.DATA.get(key, Object.keys(getOptions).length > 0 ? getOptions : undefined);
            if (object) {
              break;
            }
          }

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
            headers.set('Cross-Origin-Resource-Policy', 'cross-origin');
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
      for (const key of candidateKeys) {
        try {
          const upstreamUrl = `https://games-data.4tm.io.vn/${key}`;
          const upstreamRes = await fetch(upstreamUrl, {
            headers: request.headers,
            method: request.method,
          });

          if (upstreamRes.ok && upstreamRes.status !== 404) {
            const ct = upstreamRes.headers.get('content-type') || '';
            // Ensure upstream response is not an HTML fallback page
            if (!ct.includes('text/html')) {
              const headers = new Headers(upstreamRes.headers);
              headers.set('Access-Control-Allow-Origin', '*');
              headers.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
              headers.set('Access-Control-Allow-Headers', '*');
              headers.set('Access-Control-Expose-Headers', 'Content-Range, Content-Length, Accept-Ranges, Content-Type, etag');
              headers.set('Cross-Origin-Resource-Policy', 'cross-origin');

              if (!headers.get('Content-Type')) {
                headers.set('Content-Type', 'application/octet-stream');
              }

              return new Response(isHead ? null : upstreamRes.body, {
                status: upstreamRes.status,
                headers,
              });
            }
          }
        } catch (upstreamErr) {
          console.warn(`[4TM Games Worker] Upstream fetch failed for key ${key}:`, upstreamErr);
        }
      }

      // 3. Return explicit 404 if not found (NEVER silently serve SPA HTML fallback)
      return new Response('Package file not found', {
        status: 404,
        headers: {
          'Content-Type': 'text/plain',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    // Handle WASM request decompression & streaming delivery
    if ((url.pathname.endsWith('.wasm') || url.pathname.endsWith('.wasm.gz')) && env.ASSETS) {
      try {
        let primaryUrl = request.url;
        let fallbackUrl = request.url.endsWith('.gz') ? request.url.slice(0, -3) : request.url + '.gz';

        let assetRes = await env.ASSETS.fetch(primaryUrl);
        let ct = assetRes.headers.get('content-type') || '';

        // If primary fetch failed or returned HTML fallback, try fallback URL
        if (!assetRes.ok || assetRes.status !== 200 || ct.includes('text/html') || !assetRes.body) {
          assetRes = await env.ASSETS.fetch(fallbackUrl);
          ct = assetRes.headers.get('content-type') || '';
        }

        // If both failed or returned HTML or missing body, explicitly reject with 404 (NEVER return HTML for WASM)
        if (!assetRes.ok || assetRes.status !== 200 || ct.includes('text/html') || !assetRes.body) {
          return new Response('WebAssembly asset not found', {
            status: 404,
            headers: {
              'Content-Type': 'text/plain',
              'Access-Control-Allow-Origin': '*',
            },
          });
        }

        // Read enough initial bytes (at least 4) across chunks to validate signatures without buffering full file
        let peeked: PeekedStream;
        try {
          peeked = await peekStreamBytes(assetRes.body, 4);
        } catch (readErr) {
          return new Response('Failed to read WebAssembly stream: ' + String(readErr), {
            status: 500,
            headers: {
              'Content-Type': 'text/plain',
              'Access-Control-Allow-Origin': '*',
            },
          });
        }

        const rawBytes = peeked.bytes;

        // Empty stream check
        if (rawBytes.length === 0) {
          await peeked.cancel();
          return new Response('WebAssembly asset is empty', {
            status: 404,
            headers: {
              'Content-Type': 'text/plain',
              'Access-Control-Allow-Origin': '*',
            },
          });
        }

        // Explicitly reject HTML fallback payload (e.g. <!DOCTYPE html> starting with 0x3C '<')
        if (rawBytes[0] === 0x3c) {
          await peeked.cancel();
          return new Response('WebAssembly asset not found', {
            status: 404,
            headers: {
              'Content-Type': 'text/plain',
              'Access-Control-Allow-Origin': '*',
            },
          });
        }

        const isGzip = rawBytes.length >= 2 && rawBytes[0] === 0x1f && rawBytes[1] === 0x8b;
        const isWasm =
          rawBytes.length >= 4 &&
          rawBytes[0] === 0x00 &&
          rawBytes[1] === 0x61 &&
          rawBytes[2] === 0x73 &&
          rawBytes[3] === 0x6d;

        if (!isGzip && !isWasm) {
          await peeked.cancel();
          return new Response('Invalid WebAssembly module format', {
            status: 500,
            headers: {
              'Content-Type': 'text/plain',
              'Access-Control-Allow-Origin': '*',
            },
          });
        }

        let deliveryStream: ReadableStream<Uint8Array>;
        let activeCancel: (reason?: any) => Promise<void>;

        if (isGzip) {
          // Stream decompression through DecompressionStream
          let decompressedStream: ReadableStream<Uint8Array>;
          try {
            decompressedStream = peeked.stream.pipeThrough(new DecompressionStream('gzip'));
          } catch (decompErr) {
            await peeked.cancel();
            return new Response('Invalid gzip stream: ' + String(decompErr), {
              status: 500,
              headers: {
                'Content-Type': 'text/plain',
                'Access-Control-Allow-Origin': '*',
              },
            });
          }

          // Validate decompressed WebAssembly magic header (\0asm) across chunks before committing HTTP response
          let dPeeked: PeekedStream;
          try {
            dPeeked = await peekStreamBytes(decompressedStream, 4);
          } catch (dErr) {
            return new Response('Failed to decompress WebAssembly stream: ' + String(dErr), {
              status: 500,
              headers: {
                'Content-Type': 'text/plain',
                'Access-Control-Allow-Origin': '*',
              },
            });
          }

          const dBytes = dPeeked.bytes;
          if (
            dBytes.length < 4 ||
            dBytes[0] !== 0x00 ||
            dBytes[1] !== 0x61 ||
            dBytes[2] !== 0x73 ||
            dBytes[3] !== 0x6d
          ) {
            await dPeeked.cancel();
            return new Response('Invalid WebAssembly module format', {
              status: 500,
              headers: {
                'Content-Type': 'text/plain',
                'Access-Control-Allow-Origin': '*',
              },
            });
          }

          deliveryStream = dPeeked.stream;
          activeCancel = dPeeked.cancel;
        } else {
          deliveryStream = peeked.stream;
          activeCancel = peeked.cancel;
        }

        // Configure headers for streaming WebAssembly delivery with cross-origin isolation
        const headers = new Headers();
        headers.set('Content-Type', 'application/wasm');
        headers.set('Access-Control-Allow-Origin', '*');
        headers.set('Cross-Origin-Resource-Policy', 'cross-origin');
        headers.set('Cross-Origin-Embedder-Policy', 'require-corp');
        headers.set('Cross-Origin-Opener-Policy', 'same-origin');
        headers.set('Cache-Control', 'public, max-age=31536000, immutable');

        if (request.method === 'HEAD') {
          await activeCancel();
          return new Response(null, { status: 200, headers });
        }

        return new Response(deliveryStream, { status: 200, headers });
      } catch (wasmErr) {
        console.error('[4TM Games Worker] WASM handling error:', wasmErr);
        return new Response('Error processing WebAssembly asset: ' + String(wasmErr), {
          status: 500,
          headers: {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }
    }

    if (env.ASSETS) {
      if (url.pathname.endsWith('.pck')) {
        return new Response('Package file not found', {
          status: 404,
          headers: {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }
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
