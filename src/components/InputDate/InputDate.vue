<template>
    <Input
        v-model="internalValue"
        :component="DatePicker"
        date-format="yy-mm-dd"
        show-icon
        icon-display="input"
        show-clear
        v-bind="$attrs"
    />
</template>
<script setup lang="ts">
import { computed } from "vue"
import { DatePicker } from "primevue"
import { format, parseISO } from "date-fns"
import Input from "../Input/Input.vue"

defineOptions({ inheritAttrs: false })

const modelValue = defineModel<string | null>()

const internalValue = computed({
    get: () => {
        if (modelValue.value) {
            try {
                return parseISO(modelValue.value)
            } catch {
                return null
            }
        }
        return null
    },
    set: (val) => {
        modelValue.value = val instanceof Date ? format(val, "yyyy-MM-dd") : null
    },
})
</script>
