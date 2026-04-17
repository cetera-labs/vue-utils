<template>
    <input
        v-bind="$attrs"
        :value="modelValue ?? ''"
        :class="[
            'border rounded px-3 py-2 text-sm outline-none transition',
            'placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed',
            invalid
                ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                : 'border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500',
            fluid ? 'w-full' : '',
        ]"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
</template>

<script setup lang="ts">
defineOptions({ inheritAttrs: false })

defineProps<{
    modelValue?: string | number | null
    fluid?: boolean
    invalid?: boolean
}>()

defineEmits<{
    'update:modelValue': [value: string]
}>()
</script>
