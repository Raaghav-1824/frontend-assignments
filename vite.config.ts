import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


export default defineConfig({
  server: {
    port: 5175,
    host : true
  },
  plugins: [react()],
  build: {
    outDir: 'dist', // Change to 'dist'
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom']
  }
});
