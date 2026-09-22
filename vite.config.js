import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // <-- ESTO ES LO QUE LE DICE A VITE QUE PROCESE TAILWIND v4
  ],
})