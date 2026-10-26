import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/categories': 'http://localhost:8080',
      '/Posts': 'http://localhost:8080',
      '/users': 'http://localhost:8080',
    },
  },
})
