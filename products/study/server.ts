import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import {
  S3Client,
  HeadBucketCommand,
  GetObjectCommand,
  ListObjectsV2Command,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import dotenv from 'dotenv';

// Load environment variables if running locally
dotenv.config();

// Ensure VITE_SUPABASE_URL uses project base URL without /rest/v1 or trailing slashes
if (process.env.VITE_SUPABASE_URL) {
  process.env.VITE_SUPABASE_URL = process.env.VITE_SUPABASE_URL.trim().replace(/\/rest\/v1\/?$/i, '').replace(/\/+$/, '');
}

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Lazy S3 client initialization for Cloudflare R2
let s3ClientInstance: S3Client | null = null;

function getR2Config() {
  const accountId = process.env.CLOUDFLARE_R2_ACCOUNT_ID;
  const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;
  const bucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME;
  const publicUrl = process.env.VITE_CLOUDFLARE_R2_PUBLIC_URL || null;

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

function getR2Client(): { client: S3Client | null; bucketName: string | null } {
  const config = getR2Config();
  if (!config.isConfigured || !config.accountId || !config.accessKeyId || !config.secretAccessKey || !config.bucketName) {
    return { client: null, bucketName: null };
  }

  if (!s3ClientInstance) {
    s3ClientInstance = new S3Client({
      region: 'auto',
      endpoint: `https://${config.accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
    });
  }

  return { client: s3ClientInstance, bucketName: config.bucketName };
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Cloudflare R2 Status & Health Endpoint (Sanitized - NEVER returns secret keys!)
  app.get('/api/r2/status', async (req: Request, res: Response) => {
    const config = getR2Config();
    if (!config.isConfigured) {
      return res.json({
        configured: false,
        bucket: config.bucketName || null,
        publicUrl: config.publicUrl,
        s3Connected: false,
        message: 'Cloudflare R2 environment variables are not fully configured.',
      });
    }

    try {
      const { client, bucketName } = getR2Client();
      if (!client || !bucketName) {
        return res.json({
          configured: false,
          bucket: null,
          publicUrl: config.publicUrl,
          s3Connected: false,
          error: 'Unable to initialize R2 client',
        });
      }

      // Test connectivity by checking bucket existence or listing a single key
      await client.send(new HeadBucketCommand({ Bucket: bucketName }));

      return res.json({
        configured: true,
        bucket: bucketName,
        publicUrl: config.publicUrl,
        s3Connected: true,
        message: 'Cloudflare R2 S3-compatible backend successfully connected and verified.',
      });
    } catch (err: any) {
      console.error('R2 Connectivity Check Error:', err.message || err);
      return res.json({
        configured: true,
        bucket: config.bucketName,
        publicUrl: config.publicUrl,
        s3Connected: false,
        error: err.name || 'R2ConnectionError',
        message: err.message || 'Failed to connect to R2 bucket with provided credentials.',
      });
    }
  });

  // Secure Presigned URL Generator for Protected/Dynamic Media
  app.get('/api/r2/presigned-url', async (req: Request, res: Response) => {
    const key = req.query.key as string;
    if (!key || typeof key !== 'string') {
      return res.status(400).json({ error: 'Query parameter "key" is required.' });
    }

    // Sanitize key to prevent path traversal
    const sanitizedKey = path.normalize(key).replace(/^(\.\.[\/\\])+/, '').replace(/^[\/\\]+/, '');

    const { client, bucketName } = getR2Client();
    if (!client || !bucketName) {
      return res.status(503).json({ error: 'Cloudflare R2 is not configured on the server.' });
    }

    try {
      const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: sanitizedKey,
      });

      // Expires in 15 minutes (900 seconds)
      const presignedUrl = await getSignedUrl(client, command, { expiresIn: 900 });

      return res.json({
        success: true,
        key: sanitizedKey,
        url: presignedUrl,
        expiresInSeconds: 900,
      });
    } catch (err: any) {
      console.error('Error generating presigned URL:', err);
      return res.status(500).json({ error: 'Failed to generate presigned URL.', details: err.message });
    }
  });

  // Secure Server Proxy Endpoint for R2 Asset Stream
  app.get('/api/r2/asset/*', async (req: Request, res: Response) => {
    const key = (req.params as any)[0];
    if (!key) {
      return res.status(400).json({ error: 'Asset key is required.' });
    }

    const sanitizedKey = path.normalize(key).replace(/^(\.\.[\/\\])+/, '').replace(/^[\/\\]+/, '');
    const { client, bucketName } = getR2Client();
    if (!client || !bucketName) {
      return res.status(503).json({ error: 'Cloudflare R2 is not configured on the server.' });
    }

    try {
      const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: sanitizedKey,
      });

      const response = await client.send(command);

      if (response.ContentType) {
        res.setHeader('Content-Type', response.ContentType);
      }
      if (response.ContentLength) {
        res.setHeader('Content-Length', response.ContentLength);
      }
      if (response.ETag) {
        res.setHeader('ETag', response.ETag);
      }
      // Cache-control for static course assets (1 hour)
      res.setHeader('Cache-Control', 'public, max-age=3600');

      if (response.Body) {
        (response.Body as any).pipe(res);
      } else {
        res.status(404).send('Asset not found');
      }
    } catch (err: any) {
      if (err.name === 'NoSuchKey' || err.$metadata?.httpStatusCode === 404) {
        return res.status(404).json({ error: 'Asset not found in R2 bucket.' });
      }
      console.error('Error streaming R2 asset:', err);
      return res.status(500).json({ error: 'Failed to retrieve asset from R2.', details: err.message });
    }
  });

  // Vite middleware for development vs Static Serving for Production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = fs.existsSync(path.join(__dirname, 'index.html'))
      ? __dirname
      : fs.existsSync(path.join(__dirname, 'dist/index.html'))
      ? path.join(__dirname, 'dist')
      : path.join(process.cwd(), 'products/study/dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`4TM Platform Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
