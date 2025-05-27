import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) return 'framer-motion';
            if (id.includes('react-router-dom')) return 'react-router-dom';
            if (id.includes('recharts')) return 'recharts';
            if (id.includes('lucide-react')) return 'lucide-react';
            return 'vendor';
          }
        },
      },
      // You can also adjust the chunk size warning limit if needed:
      // chunkSizeWarningLimit: 1200,
    },
  },
});
