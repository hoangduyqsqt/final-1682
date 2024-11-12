import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/momo': {
        target: 'https://test-payment.momo.vn',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/momo/, '')
      }
    }
  }
});