import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Using @tailwindcss/postcss via postcss.config.js instead of @tailwindcss/vite
// to avoid conflict with globally installed Tailwind v3.
export default defineConfig({
  plugins: [react()],
})
