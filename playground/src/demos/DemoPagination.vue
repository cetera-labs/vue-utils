<template>
  <section class="bg-white rounded-xl shadow p-6 mb-6">
    <h2 class="text-lg font-semibold text-gray-700 mb-4">Pagination</h2>
    <Pagination
      :total-records="243"
      :limit="limit"
      :offset="offset"
      @refresh="onRefresh"
    />
    <p class="mt-3 text-sm text-gray-400">limit: {{ limit }} | offset: {{ offset }}</p>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Pagination } from 'cetera-vue-utils'

const limit = ref(20)
const offset = ref(0)

const onRefresh = (e: { limit?: number; offset?: number }) => {
  if (e.limit !== undefined) limit.value = e.limit
  if (e.offset !== undefined) offset.value = e.offset
}
</script>
