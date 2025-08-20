// vite.config.mjs
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'   // 👈 OJO: plugin estándar

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,
    cssCodeSplit: true,
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks: { react: ['react', 'react-dom'] },
      },
    },
  },
})
