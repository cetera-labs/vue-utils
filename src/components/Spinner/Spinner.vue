<template>
    <div
        v-if="isLoading"
        role="status"
        class="absolute inset-0 flex items-center justify-center z-10 bg-black/15"
    >
        <SpinnerIcon
            class="animate-spin inline text-primary dark:text-primary"
            :style="{ width: sizeMap[size], height: sizeMap[size] }"
        />
        <span class="sr-only">Загрузка ...</span>
    </div>
</template>

<script setup lang="ts">
import SpinnerIcon from "@primevue/icons/spinner"

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
