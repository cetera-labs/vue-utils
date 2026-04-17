<template>
    <Input v-bind="$attrs">
        <PrimeSlider v-model="modelValue" class="my-4" />
    </Input>
</template>

<script setup lang="ts">
import { Slider as PrimeSlider } from "primevue"
import Input from "../Input/Input.vue"

defineOptions({ inheritAttrs: false })

const modelValue = defineModel<number[] | number>()
</script>
