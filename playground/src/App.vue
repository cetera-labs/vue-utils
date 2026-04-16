<template>
  <div style="padding: 2rem; font-family: sans-serif;">
    <h2>cetera-vue-utils playground</h2>

    <section>
      <h3>useNotify</h3>
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
        <button @click="notify.success('Операция выполнена успешно!')">success</button>
        <button @click="notify.error('Что-то пошло не так')">error</button>
        <button @click="notify.warn('Обратите внимание')">warn</button>
        <button @click="notify.info('Информационное сообщение')">info</button>
      </div>
    </section>
  </div>

  <Notifications />
</template>

<script setup lang="ts">
import { Notifications, useNotify } from 'cetera-vue-utils'

const notify = useNotify()
</script>
