<template>
    <TransitionRoot :show="visible" as="template">
        <HDialog class="relative z-50" @close="visible = false">
            <TransitionChild
                as="template"
                enter="duration-200 ease-out"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="duration-150 ease-in"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <div class="fixed inset-0 bg-black/40" />
            </TransitionChild>

            <div class="fixed inset-0 flex items-center justify-center p-4">
                <TransitionChild
                    as="template"
                    enter="duration-200 ease-out"
                    enter-from="opacity-0 scale-95"
                    enter-to="opacity-100 scale-100"
                    leave="duration-150 ease-in"
                    leave-from="opacity-100 scale-100"
                    leave-to="opacity-0 scale-95"
                >
                    <DialogPanel class="w-full max-w-lg rounded-xl bg-white shadow-xl">
                        <div class="flex items-center justify-between p-4 border-b border-gray-200">
                            <slot name="header">
                                <DialogTitle v-if="header" class="text-lg font-semibold text-gray-800">
                                    {{ header }}
                                </DialogTitle>
                            </slot>
                            <button
                                type="button"
                                class="ml-auto text-gray-400 hover:text-gray-600 transition"
                                @click="visible = false"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        <div class="p-4">
                            <slot />
                        </div>
                        <div v-if="$slots.footer" class="flex justify-end gap-2 p-4 border-t border-gray-200">
                            <slot name="footer" />
                        </div>
                    </DialogPanel>
                </TransitionChild>
            </div>
        </HDialog>
    </TransitionRoot>
</template>

<script setup lang="ts">
import {
    Dialog as HDialog,
    DialogPanel,
    DialogTitle,
    TransitionRoot,
    TransitionChild,
} from '@headlessui/vue'

const visible = defineModel<boolean>('visible', { default: false })

defineProps<{
    header?: string
}>()
</script>
