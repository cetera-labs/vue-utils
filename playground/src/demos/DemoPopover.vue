<template>
  <section class="bg-white rounded-xl shadow p-6 mb-6">
    <h2 class="text-lg font-semibold text-gray-700 mb-4">Popover</h2>
    <div class="flex gap-4 flex-wrap items-start">
      <Popover>
        <template #trigger>
          <Button label="bottom-start (default)" outlined />
        </template>
        <div class="p-3 text-sm text-gray-700">
          <p class="font-medium mb-1">Заголовок</p>
          <p class="text-gray-500">Содержимое поповера</p>
        </div>
      </Popover>

      <Popover placement="bottom-end">
        <template #trigger>
          <Button label="bottom-end" outlined />
        </template>
        <div class="p-3 text-sm text-gray-700">
          <p class="text-gray-500">Выровнен по правому краю</p>
        </div>
      </Popover>

      <Popover placement="top-start">
        <template #trigger>
          <Button label="top-start" outlined />
        </template>
        <div class="p-3 text-sm text-gray-700">
          <p class="text-gray-500">Открывается вверх</p>
        </div>
      </Popover>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Button, Popover } from 'cetera-vue-utils'
</script>
