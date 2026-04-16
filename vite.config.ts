import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['src/**/*'],
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'CeteraVueUtils',
      fileName: 'cetera-vue-utils',
    },
    rollupOptions: {
      external: ['vue', 'axios', 'primevue', 'uuid'],
      output: {
        globals: {
          vue: 'Vue',
          axios: 'axios',
          primevue: 'primevue',
          uuid: 'uuid',
        },
      },
    },
  },
})
