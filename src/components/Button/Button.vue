<template>
    <PrimeButton v-bind="$attrs" :disabled="loading || !!$attrs.disabled">
        <svg
            v-if="loading"
            class="animate-spin size-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
        >
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <component :is="icon" v-else-if="icon" class="size-5" />
        <slot />
    </PrimeButton>
</template>
<script setup lang="ts">
import { type FunctionalComponent } from "vue"
import PrimeButton from "primevue/button"

defineOptions({ inheritAttrs: false })

defineProps<{
    icon?: FunctionalComponent
    loading?: boolean
}>()
</script>
