<template>
  <section class="bg-white rounded-xl shadow p-6 mb-6">
    <h2 class="text-lg font-semibold text-gray-700 mb-4">Slider / Textarea</h2>
    <div class="flex flex-col gap-4 max-w-sm">
      <Slider v-model="sliderVal" label="Значение" />
      <Textarea v-model="textareaVal" label="Комментарий" rows="3" autoResize />
      <p class="text-sm text-gray-400">slider: {{ sliderVal }}</p>
    </div>
  </section>

  <section class="bg-white rounded-xl shadow p-6 mb-6">
    <h2 class="text-lg font-semibold text-gray-700 mb-4">InputDate / InputTime / InputNumber</h2>
    <div class="flex flex-col gap-4 max-w-sm">
      <InputDate v-model="dateVal" label="Дата" />
      <InputTime v-model="timeVal" label="Время" />
      <InputNumber v-model="numberVal" label="Количество" />
      <p class="text-sm text-gray-400">date: {{ dateVal }} | time: {{ timeVal }} | number: {{ numberVal }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Slider, Textarea, InputDate, InputTime, InputNumber } from 'cetera-vue-utils'

const sliderVal = ref(50)
const textareaVal = ref('')
const dateVal = ref<string | null>(null)
const timeVal = ref<string | null>(null)
const numberVal = ref<number | null>(null)
</script>
