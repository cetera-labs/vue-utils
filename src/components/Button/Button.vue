<template>
    <button
        v-bind="$attrs"
        :disabled="loading || !!$attrs.disabled"
        :class="[
            'inline-flex items-center gap-2 rounded font-medium transition cursor-pointer',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            sizeClasses,
            severityClasses,
        ]"
    >
        <svg
            v-if="loading"
            class="animate-spin size-4 shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
        >
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <component :is="icon" v-else-if="icon" class="size-5 shrink-0" />
        <template v-if="label">{{ label }}</template>
        <slot />
    </button>
</template>

<script setup lang="ts">
import { computed, type FunctionalComponent } from 'vue'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
    label?: string
    icon?: FunctionalComponent
    loading?: boolean
    severity?: 'primary' | 'secondary' | 'danger'
    outlined?: boolean
    size?: 'sm' | 'small' | 'md' | 'lg'
}>()

const sizeClasses = computed(() => {
    switch (props.size) {
        case 'sm':
        case 'small': return 'px-3 py-1.5 text-xs'
        case 'lg': return 'px-5 py-3 text-base'
        default:   return 'px-4 py-2 text-sm'
    }
})

const severityClasses = computed(() => {
    if (props.outlined) {
        switch (props.severity) {
            case 'secondary': return 'border border-gray-300 text-gray-700 hover:bg-gray-50'
            case 'danger':    return 'border border-red-600 text-red-600 hover:bg-red-50'
            default:          return 'border border-primary-500 text-primary-500 hover:bg-primary-50'
        }
    }
    switch (props.severity) {
        case 'secondary': return 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        case 'danger':    return 'bg-red-600 text-white hover:bg-red-700'
        default:          return 'bg-primary-500 text-white hover:bg-primary-600'
    }
})
</script>
