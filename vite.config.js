import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANT: The value below must match your GitHub repository name.
  // If your repo URL is github.com/username/discover-jamaica, keep this as is.
  // If you named your repo something else, change this value.
  base: '/discover-jamaica/',
})
