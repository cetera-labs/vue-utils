<template>
  <section class="bg-white rounded-xl shadow p-6 mb-6">
    <h2 class="text-lg font-semibold text-gray-700 mb-4">Checkbox / Radiobutton / Toggle</h2>
    <div class="flex flex-col gap-3">
      <Checkbox v-model="checkboxVal" label="Обычный чекбокс" />
      <Checkbox v-model="checkboxVal" label="Indeterminate" :indeterminate="true" />
      <div class="flex gap-4">
        <Radiobutton v-model="radioVal" label="Вариант A" value="a" name="demo" />
        <Radiobutton v-model="radioVal" label="Вариант B" value="b" name="demo" />
      </div>
      <Toggle v-model="toggleVal" label="Toggle (top)" />
      <Toggle v-model="toggleVal" label="Toggle (right)" labelPosition="right" />
      <p class="text-sm text-gray-400">checkbox: {{ checkboxVal }} | radio: {{ radioVal }} | toggle: {{ toggleVal }}</p>
    </div>
  </section>

  <section class="bg-white rounded-xl shadow p-6 mb-6">
    <h2 class="text-lg font-semibold text-gray-700 mb-4">Select / MultiSelect</h2>
    <div class="flex flex-col gap-4 max-w-sm">
      <Select v-model="selectVal" label="Статус" :options="statusOptions" />
      <MultiSelect v-model="multiVal" label="Теги" :options="tagOptions" selectedFirst />
      <p class="text-sm text-gray-400">select: {{ selectVal }} | multi: {{ multiVal }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox, Radiobutton, Toggle, Select, MultiSelect } from 'cetera-vue-utils'

const checkboxVal = ref(false)
const radioVal = ref('a')
const toggleVal = ref(false)

const statusOptions = [
  { name: 'Активный', value: 'active' },
  { name: 'Архив', value: 'archived' },
]
const tagOptions = [
  { name: 'Vue', value: 'vue' },
  { name: 'TypeScript', value: 'ts' },
  { name: 'Tailwind', value: 'tw' },
]
const selectVal = ref<string | null>(null)
const multiVal = ref<string[]>([])
</script>
