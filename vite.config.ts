import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

const external = ['vue', 'axios', 'primevue', /^primevue\//, /^@primevue\//, 'uuid', 'date-fns', /^date-fns\//, '@vueuse/core', /^@heroicons\//]

const globals = (id: string): string => {
  if (id === 'vue') return 'Vue'
  if (id === 'axios') return 'axios'
  if (id === 'uuid') return 'uuid'
  if (id.startsWith('primevue')) return id.replace(/\//g, '_')
  if (id.startsWith('@primevue')) return id.replace(/[@/]/g, '_')
  if (id.startsWith('date-fns')) return id.replace(/\//g, '_')
  if (id.startsWith('@heroicons')) return id.replace(/[@/]/g, '_')
  if (id === '@vueuse/core') return '_vueuse_core'
  return id
}

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
  },
  environments: {
    client: {
      build: {
        rollupOptions: {
          external,
          output: { globals },
        },
      },
    },
  },
})
