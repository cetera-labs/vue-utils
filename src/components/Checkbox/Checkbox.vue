<template>
    <div class="flex items-center gap-2" v-bind="$attrs">
        <button
            type="button"
            role="checkbox"
            :id="uuid"
            :aria-checked="indeterminate ? 'mixed' : !!modelValue"
            :disabled="disabled"
            :class="[
                'size-4 shrink-0 rounded border transition flex items-center justify-center',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                modelValue || indeterminate
                    ? 'bg-primary-500 border-primary-500'
                    : 'bg-white border-gray-300 hover:border-primary-400',
            ]"
            @click="toggle"
        >
            <svg v-if="indeterminate" class="size-3 text-white" viewBox="0 0 12 12" fill="currentColor">
                <rect x="2" y="5" width="8" height="2" rx="1" />
            </svg>
            <svg v-else-if="modelValue" class="size-3 text-white" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="2,6 5,9 10,3" />
            </svg>
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
    invalidMessage?: string
    helperText?: string
    value?: boolean | string | number
    disabled?: boolean
    indeterminate?: boolean
}

const props = defineProps<Props>()
const modelValue = defineModel<boolean | string | number>()
const { uuid } = useFormElements(props)

const toggle = () => {
    if (props.disabled) return
    modelValue.value = !modelValue.value
}
</script>
