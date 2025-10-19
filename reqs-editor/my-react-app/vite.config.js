import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
  resolve: {
    dedupe: ["react", "react-dom"],  // React 중복 방지
  },
})

