<template>
    <div>
        <label v-if="label && labelPosition === 'top'" :for="uuid" class="cursor-pointer">{{
            label
        }}</label>
        <div class="flex items-center gap-2 my-2">
            <ToggleSwitch :id="uuid" v-model="modelValue" :disabled="disabled" />
            <label v-if="label && labelPosition === 'right'" :for="uuid" class="cursor-pointer">{{
                label
            }}</label>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ToggleSwitch } from "primevue"
import { useFormElements } from "../../composables"

interface Props {
    id?: string
    label?: string
    labelPosition?: "top" | "right"
    invalidMessage?: string
    helperText?: string
    disabled?: boolean
}
defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<Props>(), {
    id: undefined,
    label: undefined,
    labelPosition: "top",
    invalidMessage: undefined,
    helperText: undefined,
})
const modelValue = defineModel<boolean>()
const { uuid } = useFormElements(props)
</script>
