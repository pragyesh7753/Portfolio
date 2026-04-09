import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rolldownOptions: {
      output: {
        manualChunks(id) {
          const moduleId = id.replace(/\\/g, '/');
          if (!moduleId.includes('/node_modules/')) return;

          if (moduleId.includes('/framer-motion/')) return 'framer-motion';
          if (moduleId.includes('/gsap/')) return 'gsap';
          if (moduleId.includes('/lenis/')) return 'lenis';
          if (moduleId.includes('/lucide-react/')) return 'lucide-react';
          if (moduleId.includes('/@emailjs/')) return 'emailjs';
          if (moduleId.includes('/@radix-ui/')) return 'radix-ui';
          if (moduleId.includes('/react/') || moduleId.includes('/react-dom/')) {
            return 'react-vendor';
          }
        },
      },
    },
  },
});
