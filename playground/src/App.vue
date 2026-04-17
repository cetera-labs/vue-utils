<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <h1 class="text-2xl font-bold text-gray-800 mb-8">cetera-vue-utils playground</h1>

    <section class="bg-white rounded-xl shadow p-6 mb-6">
      <h2 class="text-lg font-semibold text-gray-700 mb-4">useNotify</h2>
      <div class="flex gap-3 flex-wrap">
        <button class="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition" @click="notify.success('Операция выполнена успешно!')">success</button>
        <button class="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition" @click="notify.error('Что-то пошло не так')">error</button>
        <button class="px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 transition" @click="notify.warn('Обратите внимание')">warn</button>
        <button class="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition" @click="notify.info('Информационное сообщение')">info</button>
      </div>
    </section>

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

    <section class="bg-white rounded-xl shadow p-6 mb-6">
      <h2 class="text-lg font-semibold text-gray-700 mb-4">Button</h2>
      <div class="flex gap-3 flex-wrap items-center">
        <Button label="Обычная" />
        <Button label="Загрузка" :loading="true" />
        <Button label="Secondary" severity="secondary" />
        <Button label="Danger" severity="danger" />
      </div>
    </section>

    <section class="bg-white rounded-xl shadow p-6 mb-6">
      <h2 class="text-lg font-semibold text-gray-700 mb-4">ButtonLink</h2>
      <div class="flex gap-3 flex-wrap items-center">
        <ButtonLink href="https://github.com/cetera-labs/vue-utils" target="_blank">GitHub</ButtonLink>
      </div>
    </section>

    <section class="bg-white rounded-xl shadow p-6 mb-6">
      <h2 class="text-lg font-semibold text-gray-700 mb-4">Dialog</h2>
      <Button label="Открыть диалог" @click="dialogVisible = true" />
      <Dialog v-model:visible="dialogVisible" header="Пример диалога">
        <p class="text-gray-600">Содержимое диалога</p>
        <template #footer>
          <Button label="Закрыть" severity="secondary" @click="dialogVisible = false" />
        </template>
      </Dialog>
    </section>

    <section class="bg-white rounded-xl shadow p-6 mb-6">
      <h2 class="text-lg font-semibold text-gray-700 mb-4">ConfirmAction</h2>
      <Button label="Удалить" severity="danger" @click="confirmRef?.confirm(42)" />
      <ConfirmAction ref="confirmRef" danger @confirm="onConfirm">
        Вы уверены, что хотите удалить запись?
      </ConfirmAction>
      <p v-if="confirmedId" class="mt-3 text-sm text-gray-500">Подтверждено ID: {{ confirmedId }}</p>
    </section>

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

    <section class="bg-white rounded-xl shadow p-6 mb-6">
      <h2 class="text-lg font-semibold text-gray-700 mb-4">InputSearch</h2>
      <div class="max-w-sm">
        <InputSearch v-model="searchVal" :loading="searchLoading" placeholder="Поиск..." />
        <p class="mt-2 text-sm text-gray-400">query: {{ searchVal }}</p>
      </div>
    </section>
  </div>

  <Notifications />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  Notifications, Spinner, InlineLoading,
  Button, ButtonLink, Dialog, ConfirmAction,
  Checkbox, Radiobutton, Toggle,
  Select, MultiSelect, Slider, Textarea,
  InputDate, InputTime, InputNumber, InputSearch,
  useNotify,
} from 'cetera-vue-utils'
import type { SpinnerSize } from 'cetera-vue-utils'

const notify = useNotify()

// Spinner
const spinnerVisible = ref(true)
const sizes: SpinnerSize[] = ['xs', 'sm', 'base', 'lg', 'xl']

// Dialog
const dialogVisible = ref(false)

// ConfirmAction
const confirmRef = ref<InstanceType<typeof ConfirmAction>>()
const confirmedId = ref<any>(null)
const onConfirm = (id: any) => {
  confirmedId.value = id
  notify.success(`Запись #${id} удалена`)
}

// Checkbox / Radio / Toggle
const checkboxVal = ref(false)
const radioVal = ref('a')
const toggleVal = ref(false)

// Select / MultiSelect
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

// Slider / Textarea
const sliderVal = ref(50)
const textareaVal = ref('')

// InputDate / InputTime / InputNumber
const dateVal = ref<string | null>(null)
const timeVal = ref<string | null>(null)
const numberVal = ref<number | null>(null)

// InputSearch
const searchVal = ref('')
const searchLoading = ref(false)
</script>
