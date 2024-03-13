/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import svgrPlugin from 'vite-plugin-svgr'
import viteTsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
  server: {
    open: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
  },
  build: {
    outDir: 'build',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
