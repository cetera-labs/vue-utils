<script setup lang="ts">
import PrimeDialog from "primevue/dialog"

defineOptions({ inheritAttrs: false })
const visible = defineModel<boolean>("visible")
defineProps<{
    header?: string
}>()
</script>
<template>
    <PrimeDialog v-model:visible="visible" :header="header" modal v-bind="$attrs">
        <slot />
        <template v-if="$slots.footer" #footer>
            <slot name="footer" />
        </template>
    </PrimeDialog>
</template>
