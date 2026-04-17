<template>
    <Input
        v-model="modelValue"
        :component="PrimeSelect"
        :option-label="optionLabel"
        :option-value="optionValue"
        scroll-height="28rem"
        v-bind="$attrs"
    />
</template>

<script setup lang="ts">
import { Select as PrimeSelect } from "primevue"
import Input from "../Input/Input.vue"

defineOptions({ inheritAttrs: false })

const modelValue = defineModel<any>()

withDefaults(
    defineProps<{
        optionLabel?: string
        optionValue?: string
    }>(),
    {
        optionLabel: "name",
        optionValue: "value",
    }
)
</script>
