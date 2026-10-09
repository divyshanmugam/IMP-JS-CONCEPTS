import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import svgr from 'vite-plugin-svgr'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    svgr(),
    visualizer({
      filename: 'stats.html',
      open: true, // Set to true to auto-open in browser after build
      gzipSize: true,
      brotliSize: true, 
    })
  ],
  build: {
    sourcemap: true,          // Helpful for debugging production builds
    minify: 'esbuild',        // Fast minification
    target: 'es2023',         // Target modern browsers
    rollupOptions: {
      output: {
        manualChunks(id) {
          // 1. Isolate core React framework
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'framework-core';
          }
          // 2. Isolate all other third-party libraries
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
    
  },
  server: {
    port: 3000,                // Change dev server port
    open: true                 // Auto-open browser
  }
})
