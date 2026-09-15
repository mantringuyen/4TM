import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { ECOSYSTEM_PRODUCTS_CONFIG, ECOSYSTEM_DOMAIN } from './src/config/products';

dotenv.config();

const PORT = 3000;

async function startServer() {
  const app = express();

  app.use(express.json());

  // API Health Check
  app.get(['/api/health', '/health'], (_req: Request, res: Response) => {
    res.json({
      status: 'ok',
      platform: '4TM Ecosystem',
      domain: ECOSYSTEM_DOMAIN,
      timestamp: new Date().toISOString(),
    });
  });

  // API Products Endpoint
  app.get('/api/products', (_req: Request, res: Response) => {
    res.json({
      domain: ECOSYSTEM_DOMAIN,
      products: ECOSYSTEM_PRODUCTS_CONFIG,
    });
  });

  // Vite middleware for development vs Static Serving for Production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`4TM Ecosystem Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start 4TM Ecosystem server:', err);
  process.exit(1);
});
