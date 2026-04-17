<template>
    <Input v-bind="$attrs">
        <Listbox v-model="modelValue" as="div" class="relative" :disabled="disabled">
            <ListboxButton
                :class="[
                    'w-full flex items-center justify-between border rounded px-3 py-2 text-sm',
                    'outline-none transition bg-white text-left',
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                    'border-gray-300 hover:border-primary-400 focus:border-primary-500 focus:ring-1 focus:ring-primary-500',
                ]"
            >
                <span :class="selectedLabel ? 'text-gray-800' : 'text-gray-400'">
                    {{ selectedLabel ?? placeholder }}
                </span>
                <ChevronDownIcon class="size-4 text-gray-400 shrink-0" />
            </ListboxButton>

            <Transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="opacity-0 scale-95"
                enter-to-class="opacity-100 scale-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="opacity-100 scale-100"
                leave-to-class="opacity-0 scale-95"
            >
                <ListboxOptions
                    class="absolute z-50 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg
                           max-h-60 overflow-y-auto outline-none py-1"
                >
                    <ListboxOption
                        v-if="clearable"
                        :value="null"
                        v-slot="{ active }"
                    >
                        <li :class="['px-3 py-2 text-sm cursor-pointer text-gray-400 italic', active ? 'bg-gray-50' : '']">
                            {{ placeholder }}
                        </li>
                    </ListboxOption>
                    <ListboxOption
                        v-for="opt in options"
                        :key="opt[optionValue]"
                        :value="opt[optionValue]"
                        v-slot="{ active, selected }"
                    >
                        <li
                            :class="[
                                'flex items-center justify-between px-3 py-2 text-sm cursor-pointer',
                                active ? 'bg-primary-50 text-primary-700' : 'text-gray-800',
                                selected ? 'font-medium' : '',
                            ]"
                        >
                            {{ opt[optionLabel] }}
                            <CheckIcon v-if="selected" class="size-4 text-primary-500" />
                        </li>
                    </ListboxOption>
                </ListboxOptions>
            </Transition>
        </Listbox>
    </Input>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { ChevronDownIcon, CheckIcon } from '@heroicons/vue/24/outline'
import Input from '../Input/Input.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{
    options?: Record<string, any>[]
    optionLabel?: string
    optionValue?: string
    placeholder?: string
    clearable?: boolean
    disabled?: boolean
}>(), {
    options: () => [],
    optionLabel: 'name',
    optionValue: 'value',
    placeholder: 'Выберите...',
    clearable: true,
})

const modelValue = defineModel<any>()

const selectedLabel = computed(() => {
    const opt = props.options?.find(o => o[props.optionValue] === modelValue.value)
    return opt ? opt[props.optionLabel] : null
})
</script>
