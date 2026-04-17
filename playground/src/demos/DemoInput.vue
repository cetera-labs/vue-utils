<template>
  <section class="bg-white rounded-xl shadow p-6 mb-6">
    <h2 class="text-lg font-semibold text-gray-700 mb-4">Input</h2>
    <div class="flex gap-4 flex-wrap">
      <Input v-model="inputVal" label="Обычный" placeholder="Введите текст..." />
      <Input v-model="inputVal" label="С helper text" helperText="Подсказка под полем" />
      <Input v-model="inputVal" label="С ошибкой" invalidMessage="Поле обязательно для заполнения" />
      <Input v-model="inputVal" label="Disabled" placeholder="Disabled" disabled />
    </div>
    <p class="mt-3 text-sm text-gray-400">value: {{ inputVal }}</p>
  </section>

  <section class="bg-white rounded-xl shadow p-6 mb-6">
    <h2 class="text-lg font-semibold text-gray-700 mb-4">InputSearch</h2>
    <div class="max-w-sm">
      <InputSearch v-model="searchVal" :loading="searchLoading" placeholder="Поиск..." />
      <p class="mt-2 text-sm text-gray-400">query: {{ searchVal }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Input, InputSearch } from 'cetera-vue-utils'

const inputVal = ref('')
const searchVal = ref('')
const searchLoading = ref(false)
</script>
