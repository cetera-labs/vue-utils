<template>
    <div class="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        <TransitionGroup
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0 translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div
                v-for="n in notifications"
                :key="n.id"
                class="rounded-lg px-4 py-3 text-sm text-white shadow-lg"
                :class="{
                    'bg-green-600': n.type === 'success',
                    'bg-blue-500': n.type === 'info',
                    'bg-yellow-500': n.type === 'warn',
                    'bg-red-600': n.type === 'error',
                }"
            >
                {{ n.message }}
            </div>
        </TransitionGroup>
    </div>
</template>

<script setup lang="ts">
import { useNotify } from '../../composables/useNotify'

const { notifications } = useNotify()
</script>
