<template>
    <Input :component="PrimeTextarea" v-bind="$attrs" />
</template>

<script setup lang="ts">
import { Textarea as PrimeTextarea } from "primevue"
import Input from "../Input/Input.vue"

defineOptions({ inheritAttrs: false })
</script>
