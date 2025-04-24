import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server : {
    proxy : {
      '/api' :{
        target : 'https://7xsbw308-8080.uks1.devtunnels.ms',
        changeOrigin : true,
      }
    }
}
})
