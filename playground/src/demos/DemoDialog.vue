<template>
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
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button, Dialog, ConfirmAction, useNotify } from 'cetera-vue-utils'

const notify = useNotify()
const dialogVisible = ref(false)

const confirmRef = ref<InstanceType<typeof ConfirmAction>>()
const confirmedId = ref<any>(null)
const onConfirm = (id: any) => {
  confirmedId.value = id
  notify.success(`Запись #${id} удалена`)
}
</script>
