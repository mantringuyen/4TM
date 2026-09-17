import {
  S3Client,
  HeadBucketCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export interface Env {
  // Cloudflare Static Assets binding
  ASSETS?: {
    fetch: (request: Request | string) => Promise<Response>;
  };

  // Cloudflare R2 bucket binding (if bound via wrangler.jsonc)
  DATA?: any;
  R2_BUCKET?: any;
  STORAGE?: any;

  // Environment variables / Secrets (configured via wrangler secret or env)
  VITE_SUPABASE_URL?: string;
  VITE_SUPABASE_ANON_KEY?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
  CLOUDFLARE_R2_ACCOUNT_ID?: string;
  CLOUDFLARE_R2_ACCESS_KEY_ID?: string;
  CLOUDFLARE_R2_SECRET_ACCESS_KEY?: string;
  CLOUDFLARE_R2_BUCKET_NAME?: string;
  VITE_CLOUDFLARE_R2_PUBLIC_URL?: string;
  GEMINI_API_KEY?: string;
  APP_URL?: string;
}

function getR2Credentials(env: Env) {
  const accountId = env.CLOUDFLARE_R2_ACCOUNT_ID || (typeof process !== 'undefined' ? process.env?.CLOUDFLARE_R2_ACCOUNT_ID : undefined);
  const accessKeyId = env.CLOUDFLARE_R2_ACCESS_KEY_ID || (typeof process !== 'undefined' ? process.env?.CLOUDFLARE_R2_ACCESS_KEY_ID : undefined);
  const secretAccessKey = env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || (typeof process !== 'undefined' ? process.env?.CLOUDFLARE_R2_SECRET_ACCESS_KEY : undefined);
  const bucketName = env.CLOUDFLARE_R2_BUCKET_NAME || (typeof process !== 'undefined' ? process.env?.CLOUDFLARE_R2_BUCKET_NAME : undefined) || 'storage';
  const publicUrl = env.VITE_CLOUDFLARE_R2_PUBLIC_URL || (typeof process !== 'undefined' ? process.env?.VITE_CLOUDFLARE_R2_PUBLIC_URL : undefined) || null;

  const isConfigured = Boolean(accountId && accessKeyId && secretAccessKey && bucketName);

  return {
    accountId,
    accessKeyId,
    secretAccessKey,
    bucketName,
    publicUrl,
    isConfigured,
  };
}

function getS3Client(env: Env): { client: S3Client | null; bucketName: string | null } {
  const creds = getR2Credentials(env);
  if (!creds.isConfigured || !creds.accountId || !creds.accessKeyId || !creds.secretAccessKey || !creds.bucketName) {
    return { client: null, bucketName: null };
  }

  const client = new S3Client({
    region: 'auto',
    endpoint: `https://${creds.accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: creds.accessKeyId,
      secretAccessKey: creds.secretAccessKey,
    },
  });

  return { client, bucketName: creds.bucketName };
}

export default {
  async fetch(request: Request, env: Env, ctx: any): Promise<Response> {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // 1. Health check route
    if (pathname === '/api/health') {
      return new Response(
        JSON.stringify({
          status: 'ok',
          runtime: 'cloudflare-worker',
          timestamp: new Date().toISOString(),
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    // 2. Cloudflare R2 Status & Health Endpoint (Sanitized - NEVER returns secret keys!)
    if (pathname === '/api/r2/status') {
      const creds = getR2Credentials(env);
      const nativeBucket = env.R2_BUCKET || env.STORAGE;

      // Check if native R2 binding is present
      if (nativeBucket) {
        try {
          if (typeof nativeBucket.list === 'function') {
            await nativeBucket.list({ limit: 1 });
          }
          return new Response(
            JSON.stringify({
              configured: true,
              bucket: creds.bucketName || 'R2_BUCKET',
              publicUrl: creds.publicUrl,
              s3Connected: true,
              bindingType: 'native_r2_binding',
              message: 'Cloudflare R2 native worker binding successfully connected and verified.',
            }),
            {
              status: 200,
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
              },
            }
          );
        } catch (err: any) {
          return new Response(
            JSON.stringify({
              configured: true,
              bucket: creds.bucketName || 'R2_BUCKET',
              publicUrl: creds.publicUrl,
              s3Connected: false,
              bindingType: 'native_r2_binding',
              error: err.name || 'R2BindingError',
              message: err.message || 'Failed to connect to R2 native bucket.',
            }),
            {
              status: 200,
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
              },
            }
          );
        }
      }

      // Check S3 client credentials
      if (!creds.isConfigured) {
        return new Response(
          JSON.stringify({
            configured: false,
            bucket: creds.bucketName || null,
            publicUrl: creds.publicUrl,
            s3Connected: false,
            message: 'Cloudflare R2 environment variables are not fully configured.',
          }),
          {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          }
        );
      }

      try {
        const { client, bucketName } = getS3Client(env);
        if (!client || !bucketName) {
          return new Response(
            JSON.stringify({
              configured: false,
              bucket: null,
              publicUrl: creds.publicUrl,
              s3Connected: false,
              error: 'Unable to initialize R2 S3 client',
            }),
            {
              status: 200,
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
              },
            }
          );
        }

        await client.send(new HeadBucketCommand({ Bucket: bucketName }));

        return new Response(
          JSON.stringify({
            configured: true,
            bucket: bucketName,
            publicUrl: creds.publicUrl,
            s3Connected: true,
            bindingType: 's3_compatible_api',
            message: 'Cloudflare R2 S3-compatible backend successfully connected and verified.',
          }),
          {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          }
        );
      } catch (err: any) {
        return new Response(
          JSON.stringify({
            configured: true,
            bucket: creds.bucketName,
            publicUrl: creds.publicUrl,
            s3Connected: false,
            bindingType: 's3_compatible_api',
            error: err.name || 'R2ConnectionError',
            message: err.message || 'Failed to connect to R2 bucket with provided credentials.',
          }),
          {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          }
        );
      }
    }

    // 3. Presigned URL Generator for Private/Dynamic R2 Media
    if (pathname === '/api/r2/presigned-url') {
      const key = url.searchParams.get('key');
      if (!key) {
        return new Response(
          JSON.stringify({ error: 'Query parameter "key" is required.' }),
          {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          }
        );
      }

      // Sanitize key against directory traversal
      const sanitizedKey = decodeURIComponent(key).replace(/^(\.\.[\/\\])+/, '').replace(/^[\/\\]+/, '');
      const { client, bucketName } = getS3Client(env);

      if (!client || !bucketName) {
        return new Response(
          JSON.stringify({ error: 'Cloudflare R2 S3 credentials are not configured on the worker.' }),
          {
            status: 503,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          }
        );
      }

      try {
        const command = new GetObjectCommand({
          Bucket: bucketName,
          Key: sanitizedKey,
        });

        const presignedUrl = await getSignedUrl(client, command, { expiresIn: 900 });

        return new Response(
          JSON.stringify({
            success: true,
            key: sanitizedKey,
            url: presignedUrl,
            expiresInSeconds: 900,
          }),
          {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          }
        );
      } catch (err: any) {
        return new Response(
          JSON.stringify({ error: 'Failed to generate presigned URL.', details: err.message }),
          {
            status: 500,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          }
        );
      }
    }

    // 4. Asset Streaming Proxy Route
    if (pathname.startsWith('/api/r2/asset/')) {
      const rawKey = pathname.replace(/^\/api\/r2\/asset\//, '');
      if (!rawKey) {
        return new Response(
          JSON.stringify({ error: 'Asset key is required.' }),
          {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          }
        );
      }

      const sanitizedKey = decodeURIComponent(rawKey).replace(/^(\.\.[\/\\])+/, '').replace(/^[\/\\]+/, '');
      const nativeBucket = env.R2_BUCKET || env.STORAGE;

      // Fast path: native R2 Bucket binding
      if (nativeBucket && typeof nativeBucket.get === 'function') {
        try {
          const object = await nativeBucket.get(sanitizedKey);
          if (!object) {
            return new Response(
              JSON.stringify({ error: 'Asset not found in R2 bucket.' }),
              {
                status: 404,
                headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*',
                },
              }
            );
          }

          const headers = new Headers();
          if (typeof object.writeHttpMetadata === 'function') {
            object.writeHttpMetadata(headers);
          }
          if (object.httpEtag) {
            headers.set('etag', object.httpEtag);
          }
          headers.set('Cache-Control', 'public, max-age=3600');
          headers.set('Access-Control-Allow-Origin', '*');

          return new Response(object.body, { status: 200, headers });
        } catch (err: any) {
          return new Response(
            JSON.stringify({ error: 'Failed to retrieve asset from R2.', details: err.message }),
            {
              status: 500,
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
              },
            }
          );
        }
      }

      // S3 client fallback path
      const { client, bucketName } = getS3Client(env);
      if (!client || !bucketName) {
        return new Response(
          JSON.stringify({ error: 'Cloudflare R2 is not configured on the worker.' }),
          {
            status: 503,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          }
        );
      }

      try {
        const command = new GetObjectCommand({
          Bucket: bucketName,
          Key: sanitizedKey,
        });

        const response = await client.send(command);

        const headers = new Headers();
        if (response.ContentType) headers.set('Content-Type', response.ContentType);
        if (response.ContentLength) headers.set('Content-Length', response.ContentLength.toString());
        if (response.ETag) headers.set('ETag', response.ETag);
        headers.set('Cache-Control', 'public, max-age=3600');
        headers.set('Access-Control-Allow-Origin', '*');

        let bodyStream: any = response.Body;
        if (response.Body && typeof (response.Body as any).transformToWebStream === 'function') {
          bodyStream = await (response.Body as any).transformToWebStream();
        }

        return new Response(bodyStream, { status: 200, headers });
      } catch (err: any) {
        if (err.name === 'NoSuchKey' || err.$metadata?.httpStatusCode === 404) {
          return new Response(
            JSON.stringify({ error: 'Asset not found in R2 bucket.' }),
            {
              status: 404,
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
              },
            }
          );
        }
        return new Response(
          JSON.stringify({ error: 'Failed to retrieve asset from R2.', details: err.message }),
          {
            status: 500,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          }
        );
      }
    }

    // 5. Static Assets fallback (Single-Page Application frontend)
    if (env.ASSETS && typeof env.ASSETS.fetch === 'function') {
      return await env.ASSETS.fetch(request);
    }

    return new Response('Not Found', { status: 404 });
  },
};
