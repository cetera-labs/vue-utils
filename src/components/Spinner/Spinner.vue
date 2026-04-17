<template>
    <div
        v-if="isLoading"
        role="status"
        class="absolute inset-0 flex items-center justify-center z-10 bg-black/15"
    >
        <svg
            class="animate-spin"
            :style="{ width: sizeMap[size], height: sizeMap[size] }"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
        >
            <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
            />
            <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
        </svg>
        <span class="sr-only">Загрузка ...</span>
    </div>
</template>

<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        isLoading?: boolean
        size?: "xs" | "sm" | "base" | "lg" | "xl"
    }>(),
    {
        isLoading: true,
        size: "xl",
    }
)

const sizeMap: Record<NonNullable<typeof props.size>, string> = {
    xs: '1rem',
    sm: '1.5rem',
    base: '2rem',
    lg: '2.5rem',
    xl: '3.5rem',
}
</script>
