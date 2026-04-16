import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      'cetera-vue-utils': resolve(__dirname, '../src/index.ts'),
    },
  },
})
