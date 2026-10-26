import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react(), ViteImageOptimizer({
    // Konfigurasi ini akan otomatis mengecilkan ukuran file gambar di folder public/assets
    png: { quality: 70 },
    jpeg: { quality: 70 },
    jpg: { quality: 70 },
    webp: { quality: 75 }, // Format WebP sangat disarankan
  }),],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});