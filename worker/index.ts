import { ECOSYSTEM_PRODUCTS_CONFIG, ECOSYSTEM_DOMAIN } from '../src/config/products';

export interface Env {
  ASSETS?: {
    fetch: (request: Request | string) => Promise<Response>;
  };
  APP_URL?: string;
}

export default {
  async fetch(request: Request, env: Env, _ctx: any): Promise<Response> {
    const url = new URL(request.url);
    const pathname = url.pathname;

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
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*',
          },
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
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    // 3. Static assets / SPA fallback
    if (env.ASSETS && typeof env.ASSETS.fetch === 'function') {
      return await env.ASSETS.fetch(request);
    }

    return new Response('Not Found', { status: 404 });
  },
};
