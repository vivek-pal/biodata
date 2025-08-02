import { defineConfig, loadEnv  } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    // Load env variables based on mode
 const env = loadEnv(mode, process.cwd(), '');

  return {
  plugins: [react()],
  base: "/biodata/", // Set the base path for GitHub Pages
  server: {
    port: 3000, // Set the development server port
    proxy: {
      '/api': {
        // target: 'https://58xv7ofnm3.execute-api.ap-south-1.amazonaws.com',
        target: env.VITE_API_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
}
})

