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
      external: ['vue', 'axios', 'primevue', /^primevue\//, /^@primevue\//, 'uuid'],
      output: {
        globals: (id) => {
          if (id === 'vue') return 'Vue'
          if (id === 'axios') return 'axios'
          if (id === 'uuid') return 'uuid'
          if (id.startsWith('primevue')) return id.replace(/\//g, '_')
          if (id.startsWith('@primevue')) return id.replace(/[@/]/g, '_')
          return id
        },
      },
    },
  },
})
