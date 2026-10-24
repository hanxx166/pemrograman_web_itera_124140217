// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Agar tidak perlu import describe/it/expect setiap saat
    environment: 'jsdom', // Simulasi browser DOM untuk testing komponen React
    setupFiles: './src/test/setup.js', // File setup global untuk RTL
  },
})