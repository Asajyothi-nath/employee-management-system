import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    // This tells Vite to swap the local text with your Render URL during deployment builds
    'http://localhost:8000/api': JSON.stringify('https://onrender.com'),
  }
})
