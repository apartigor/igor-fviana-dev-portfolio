import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    target: 'es2020',
    cssCodeSplit: false,
    assetsInlineLimit: 0,
    modulePreload: { polyfill: false },
    rollupOptions: {
      output: {
        entryFileNames: 'assets/site.js',
        assetFileNames: 'assets/site.[ext]',
      },
    },
  },
})
