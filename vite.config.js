import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Split vendor libraries into stable, cacheable chunks. Users' browsers
    // can keep these cached across deploys since app code changes won't
    // invalidate them.
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'helmet': ['react-helmet-async'],
        },
      },
    },
    // Raise the warning threshold since heavy tool libraries (pdf-lib,
    // pdfjs-dist) are intentionally in their own lazy chunks.
    chunkSizeWarningLimit: 900,
    // Generate ESM-friendly output and disable sourcemaps in prod for
    // smaller payloads.
    sourcemap: false,
    target: 'es2020',
  },
  // Ensure preview/server uses same chunking
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'react-helmet-async'],
  },
})