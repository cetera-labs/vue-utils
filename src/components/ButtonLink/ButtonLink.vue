<template>
    <a
        v-bind="$attrs"
        :class="[
            'inline-flex items-center gap-2 rounded font-medium transition cursor-pointer',
            sizeClasses,
            severityClasses,
        ]"
    >
        <component :is="icon" v-if="icon" class="size-5 shrink-0" />
        <template v-if="label">{{ label }}</template>
        <slot />
    </a>
</template>

<script setup lang="ts">
import { computed, type FunctionalComponent } from 'vue'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
    label?: string
    icon?: FunctionalComponent
    severity?: 'primary' | 'secondary' | 'danger'
    outlined?: boolean
    size?: 'sm' | 'md' | 'lg'
}>()

const sizeClasses = computed(() => {
    switch (props.size) {
        case 'sm': return 'px-3 py-1.5 text-xs'
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
