import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/healthkart': {
        target: 'https://api.healthkart.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/healthkart/, '')
      }
    }
  }
})
