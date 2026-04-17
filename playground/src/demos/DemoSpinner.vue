<template>
  <section class="bg-white rounded-xl shadow p-6 mb-6">
    <h2 class="text-lg font-semibold text-gray-700 mb-4">Spinner</h2>
    <div class="flex gap-4 items-center flex-wrap">
      <div class="relative h-16 w-16" v-for="size in sizes" :key="size">
        <Spinner :size="size" />
        <span class="absolute bottom-0 left-0 right-0 text-center text-xs text-gray-400">{{ size }}</span>
      </div>
    </div>
    <div class="mt-4">
      <label class="flex items-center gap-2 text-sm text-gray-600">
        <input type="checkbox" v-model="spinnerVisible" />
        isLoading
      </label>
      <div class="relative h-24 mt-2 bg-gray-100 rounded-lg">
        <Spinner :isLoading="spinnerVisible" size="lg" />
        <p class="p-4 text-gray-400 text-sm">Контент за спиннером</p>
      </div>
    </div>
  </section>

  <section class="bg-white rounded-xl shadow p-6 mb-6">
    <h2 class="text-lg font-semibold text-gray-700 mb-4">InlineLoading</h2>
    <div class="flex gap-4 items-center flex-wrap">
      <InlineLoading />
      <InlineLoading loadingText="Сохранение..." />
      <InlineLoading :isLoading="false" loadingText="Не видно" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Spinner, InlineLoading } from 'cetera-vue-utils'
import type { SpinnerSize } from 'cetera-vue-utils'

const spinnerVisible = ref(true)
const sizes: SpinnerSize[] = ['xs', 'sm', 'base', 'lg', 'xl']
</script>
