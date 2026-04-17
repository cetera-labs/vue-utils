<template>
  <section class="bg-white rounded-xl shadow p-6 mb-6">
    <h2 class="text-lg font-semibold text-gray-700 mb-4">DataTable</h2>
    <DataTable :value="tableData" scrollable scroll-height="200px" sticky-header>
      <Column field="name" header="Имя" />
      <Column field="role" header="Роль" />
      <Column field="status" header="Статус">
        <template #body="{ data }">
          <span :class="data.status === 'active' ? 'text-green-600' : 'text-gray-400'">
            {{ data.status === 'active' ? 'Активен' : 'Архив' }}
          </span>
        </template>
      </Column>
      <Column header="Действия">
        <template #body="{ data }">
          <Button label="Изменить" size="sm" severity="secondary" outlined @click="notify.info(data.name)" />
        </template>
      </Column>
    </DataTable>
  </section>
</template>

<script setup lang="ts">
import { Button, DataTable, Column, useNotify } from 'cetera-vue-utils'

const notify = useNotify()

const tableData = [
  { name: 'Иван Петров', role: 'Администратор', status: 'active' },
  { name: 'Мария Сидорова', role: 'Менеджер', status: 'active' },
  { name: 'Алексей Козлов', role: 'Оператор', status: 'archived' },
  { name: 'Елена Новикова', role: 'Менеджер', status: 'active' },
  { name: 'Дмитрий Волков', role: 'Оператор', status: 'archived' },
  { name: 'Ольга Морозова', role: 'Администратор', status: 'active' },
]
</script>
