<template>
  <section class="bg-white rounded-xl shadow p-6 mb-6">
    <h2 class="text-lg font-semibold text-gray-700 mb-4">useNotify</h2>
    <div class="flex gap-3 flex-wrap">
      <Button class="bg-green-600! hover:bg-green-700!" @click="notify.success('Операция выполнена успешно!')">success</Button>
      <Button class="bg-red-600! hover:bg-red-700!" @click="notify.error('Что-то пошло не так')">error</Button>
      <Button class="bg-yellow-500! hover:bg-yellow-600!" @click="notify.warn('Обратите внимание')">warn</Button>
      <Button class="bg-blue-500! hover:bg-blue-600!" @click="notify.info('Информационное сообщение')">info</Button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Button, useNotify } from 'cetera-vue-utils'
const notify = useNotify()
</script>
