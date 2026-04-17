<template>
    <Input
        v-model="internalValue"
        :component="DatePicker"
        time-only
        show-clear
        v-bind="$attrs"
    />
</template>
<script setup lang="ts">
import { computed } from "vue"
import { DatePicker } from "primevue"
import { format, parse } from "date-fns"
import Input from "../Input/Input.vue"

defineOptions({ inheritAttrs: false })

const modelValue = defineModel<string | null>()

const internalValue = computed({
    get: () => {
        if (modelValue.value) {
            try {
                return parse(modelValue.value, "HH:mm", new Date())
            } catch {
                return null
            }
        }
        return null
    },
    set: (val) => {
        modelValue.value = val instanceof Date ? format(val, "HH:mm") : null
    },
})
</script>
