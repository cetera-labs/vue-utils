<template>
    <div v-bind="$attrs">
        <label
            v-if="label && labelPosition === 'top'"
            class="cursor-pointer select-none text-sm mb-1 block"
        >{{ label }}</label>
        <div class="flex items-center gap-2">
            <Switch
                v-model="modelValue"
                :disabled="disabled"
                :class="[
                    'relative inline-flex h-5 w-9 shrink-0 rounded-full border-2 border-transparent',
                    'transition-colors duration-200 cursor-pointer',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                    modelValue ? 'bg-primary-500' : 'bg-gray-200',
                ]"
            >
                <span
                    aria-hidden="true"
                    :class="[
                        'pointer-events-none inline-block size-4 rounded-full bg-white shadow',
                        'transform transition-transform duration-200',
                        modelValue ? 'translate-x-4' : 'translate-x-0',
                    ]"
                />
            </Switch>
            <label
                v-if="label && labelPosition === 'right'"
                class="cursor-pointer select-none text-sm"
            >{{ label }}</label>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Switch } from '@headlessui/vue'

defineOptions({ inheritAttrs: false })

withDefaults(defineProps<{
    label?: string
    labelPosition?: 'top' | 'right'
    disabled?: boolean
}>(), {
    labelPosition: 'top',
})

const modelValue = defineModel<boolean>()
</script>
