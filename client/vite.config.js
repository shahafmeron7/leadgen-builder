import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import fs from 'fs';
import path from 'path';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  server: {
    open: true,
    port: 5173, // Ensure this matches your desired development server port
    https: {
      key: fs.readFileSync(path.resolve(__dirname, '../certs', 'server.key')),
      cert: fs.readFileSync(path.resolve(__dirname, '../certs', 'server.cert')),
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
