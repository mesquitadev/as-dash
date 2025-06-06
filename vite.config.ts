import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    watch: {
      usePolling: true,
    },
  },
  optimizeDeps: {
    exclude: ['react-error-boundary'],
  },
  build: {
    commonjsOptions: {
      include: [/react-error-boundary/, /node_modules/],
    },
  },
});