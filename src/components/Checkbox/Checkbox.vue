<template>
    <div class="flex items-center gap-2" v-bind="$attrs">
        <PrimeCheckbox
            ref="checkboxRef"
            v-model="modelValue"
            :input-id="uuid"
            :disabled="disabled"
            :value="value"
            :name="name"
            binary
        />
        <label v-if="label" :for="uuid" v-html="label" />
    </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue"
import { Checkbox as PrimeCheckbox } from "primevue"
import { useFormElements } from "../../composables"

defineOptions({ inheritAttrs: false })

const modelValue = defineModel<boolean | string | number>()

interface Props {
    id?: string
    label?: string
    name?: string
    invalidMessage?: string
    helperText?: string
    value?: boolean | string | number
    disabled?: boolean
    indeterminate?: boolean
}
const props = defineProps<Props>()
const { uuid } = useFormElements(props)

const checkboxRef = ref()

watchEffect(() => {
    const input = checkboxRef.value?.$el?.querySelector("input")
    if (input) input.indeterminate = !!props.indeterminate
})
</script>
