import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'certs/10.89.170.255-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'certs/10.89.170.255.pem')),
    },
    port: 5173, // Set the port to 5173
    host: '0.0.0.0', // Use your local IP address
  },
});

