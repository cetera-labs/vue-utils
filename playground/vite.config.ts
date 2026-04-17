import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      'cetera-vue-utils': resolve(__dirname, '../src/index.ts'),
    },
    dedupe: ['vue', 'primevue'],
  },
  server: {
    fs: {
      allow: ['..'],
    },
  },
})
