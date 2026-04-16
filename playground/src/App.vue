<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <h1 class="text-2xl font-bold text-gray-800 mb-8">cetera-vue-utils playground</h1>

    <section class="bg-white rounded-xl shadow p-6 mb-6">
      <h2 class="text-lg font-semibold text-gray-700 mb-4">useNotify</h2>
      <div class="flex gap-3 flex-wrap">
        <button
          class="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
          @click="notify.success('Операция выполнена успешно!')"
        >success</button>
        <button
          class="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
          @click="notify.error('Что-то пошло не так')"
        >error</button>
        <button
          class="px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 transition"
          @click="notify.warn('Обратите внимание')"
        >warn</button>
        <button
          class="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
          @click="notify.info('Информационное сообщение')"
        >info</button>
      </div>
    </section>
  </div>

  <Notifications />

</template>

<script setup lang="ts">
import { Notifications, useNotify } from 'cetera-vue-utils'

const notify = useNotify()
</script>
