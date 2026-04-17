<template>
    <Input v-model="modelValue" :component="PrimeInputNumber" v-bind="$attrs" />
</template>

<script setup lang="ts">
import { InputNumber as PrimeInputNumber } from "primevue"
import Input from "../Input/Input.vue"

defineOptions({ inheritAttrs: false })

const modelValue = defineModel<number | null>()
</script>
