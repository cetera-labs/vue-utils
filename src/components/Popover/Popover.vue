<template>
    <HPopover class="relative inline-block" v-bind="$attrs">
        <PopoverButton class="outline-none">
            <slot name="trigger" />
        </PopoverButton>

        <Transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
        >
            <PopoverPanel
                :class="[
                    'absolute z-50 min-w-max rounded-lg border border-gray-200 bg-white shadow-lg',
                    panelClasses,
                ]"
            >
                <slot />
            </PopoverPanel>
        </Transition>
    </HPopover>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
    Popover as HPopover,
    PopoverButton,
    PopoverPanel,
} from '@headlessui/vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{
    placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' | 'bottom' | 'top'
}>(), {
    placement: 'bottom-start',
})

const panelClasses = computed(() => {
    switch (props.placement) {
        case 'bottom-end':   return 'top-full mt-1 right-0'
        case 'bottom':       return 'top-full mt-1 left-1/2 -translate-x-1/2'
        case 'top-start':    return 'bottom-full mb-1 left-0'
        case 'top-end':      return 'bottom-full mb-1 right-0'
        case 'top':          return 'bottom-full mb-1 left-1/2 -translate-x-1/2'
        default:             return 'top-full mt-1 left-0'
    }
})
</script>
