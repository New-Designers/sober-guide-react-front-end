import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Set the port to 5173
    host: '0.0.0.0', // Use your local IP address
    proxy: {
      '/api':{
        target:'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/,'')
      }
    }
  },
});

