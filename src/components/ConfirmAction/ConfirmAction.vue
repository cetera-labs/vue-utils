<template>
    <Dialog v-model:visible="visible" header="Требуется подтверждение">
        <div class="text-gray-500"><slot>Подтвердите действие</slot></div>
        <template #footer>
            <Button class="w-32" severity="secondary" @click="visible = false">Нет</Button>
            <Button class="w-32" :severity="danger ? 'danger' : undefined" @click="accept">Да</Button>
        </template>
    </Dialog>
</template>
<script setup lang="ts">
import { ref } from "vue"
import Dialog from "../Dialog/Dialog.vue"
import Button from "../Button/Button.vue"

defineProps<{ danger?: boolean }>()

const emit = defineEmits<{ confirm: [id: any] }>()

const visible = ref(false)
const pendingId = ref<any>(null)

const confirm = (id: any) => {
    pendingId.value = id
    visible.value = true
}

const accept = () => {
    emit("confirm", pendingId.value)
    visible.value = false
}

defineExpose({ confirm })
</script>
