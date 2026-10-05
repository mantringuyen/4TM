import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  const appUrl = (process.env.APP_URL || process.env.VITE_APP_URL || '').trim();
  return {
    define: {
      'import.meta.env.APP_URL': JSON.stringify(appUrl),
    },
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@shared': path.resolve(__dirname, '../../shared'),
      },
      dedupe: ['react', 'react-dom'],
    },
    server: {
      proxy: {
        '/api/games-data': {
          target: 'https://games-data.4tm.io.vn',
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/api\/games-data/, ''),
        },
      },
      fs: {
        allow: [path.resolve(__dirname, '../../')],
      },
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
