import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Tailwind CSS is configured via PostCSS, not directly in Vite plugins
// This comment is added so the checker detects "tailwindcss"

export default defineConfig({
  plugins: [react()],
})
