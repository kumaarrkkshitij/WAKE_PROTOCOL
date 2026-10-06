import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite configuration for React client and API dev proxy
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || '/',
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
})
