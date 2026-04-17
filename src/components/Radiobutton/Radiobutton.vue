<template>
    <div class="flex items-center gap-2">
        <button
            type="button"
            role="radio"
            :id="uuid"
            :aria-checked="modelValue === value"
            :disabled="disabled"
            :class="[
                'size-4 shrink-0 rounded-full border-2 transition flex items-center justify-center',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                modelValue === value
                    ? 'border-primary-500'
                    : 'border-gray-300 hover:border-primary-400',
            ]"
            @click="select"
        >
            <span
                v-if="modelValue === value"
                class="size-2 rounded-full bg-primary-500"
            />
        </button>
        <label v-if="label" :for="uuid" class="cursor-pointer select-none text-sm" v-html="label" />
    </div>
</template>

<script setup lang="ts">
import { useFormElements } from '../../composables'

defineOptions({ inheritAttrs: false })

interface Props {
    id?: string
    label?: string
    name?: string
    value?: string | number
    disabled?: boolean
}

const props = defineProps<Props>()
const modelValue = defineModel<string | number | null>()
const { uuid } = useFormElements(props)

const select = () => {
    if (props.disabled) return
    modelValue.value = props.value ?? null
}
</script>
