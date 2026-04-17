<template>
    <div class="flex items-center gap-2">
        <PrimeRadioButton
            v-model="modelValue"
            :input-id="uuid"
            :disabled="disabled"
            :value="value"
            :name="name"
        />
        <label v-if="label" :for="uuid" v-html="label" />
    </div>
</template>

<script setup lang="ts">
import { RadioButton as PrimeRadioButton } from "primevue"
import { useFormElements } from "../../composables"

defineOptions({ inheritAttrs: false })

const modelValue = defineModel<string | number | null>()

interface Props {
    id?: string
    label?: string
    name?: string
    value?: string | number
    disabled?: boolean
}
const props = defineProps<Props>()
const { uuid } = useFormElements(props)
</script>
