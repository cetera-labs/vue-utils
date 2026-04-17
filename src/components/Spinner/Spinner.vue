<template>
    <div
        v-if="isLoading"
        role="status"
        class="absolute inset-0 flex items-center justify-center z-10 rounded-lg bg-black/15"
    >
        <SpinnerIcon
            class="animate-spin text-[2rem] inline text-primary dark:text-primary"
            :class="[
                size === 'xs' ? 'h-4 w-4' : '',
                size === 'sm' ? 'h-6 w-6' : '',
                size === 'base' ? 'h-8 w-8' : '',
                size === 'lg' ? 'h-10 w-10' : '',
                size === 'xl' ? 'h-14 w-14' : '',
            ]"
        />
        <span class="sr-only">Загрузка ...</span>
    </div>
</template>

<script setup lang="ts">
import SpinnerIcon from "@primevue/icons/spinner"

withDefaults(
    defineProps<{
        isLoading?: boolean
        size?: "xs" | "sm" | "base" | "lg" | "xl"
    }>(),
    {
        isLoading: true,
        size: "xl",
    }
)
</script>
