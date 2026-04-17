<template>
    <Input v-bind="$attrs">
        <Listbox v-model="modelValue" as="div" class="relative" multiple :disabled="disabled">
            <ListboxButton
                :class="[
                    'w-full flex items-center justify-between border rounded px-3 py-2 text-sm',
                    'outline-none transition bg-white text-left',
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                    'border-gray-300 hover:border-primary-400 focus:border-primary-500 focus:ring-1 focus:ring-primary-500',
                ]"
            >
                <span v-if="modelValue?.length" class="text-gray-800 truncate">
                    {{ selectedLabels }}
                </span>
                <span v-else class="text-gray-400">{{ placeholder }}</span>
                <ChevronDownIcon class="size-4 text-gray-400 shrink-0 ml-2" />
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
                        v-for="opt in sortedOptions"
                        :key="opt[optionValue]"
                        :value="opt[optionValue]"
                        v-slot="{ active, selected }"
                    >
                        <li
                            :class="[
                                'flex items-center gap-2 px-3 py-2 text-sm cursor-pointer',
                                active ? 'bg-primary-50 text-primary-700' : 'text-gray-800',
                            ]"
                        >
                            <span
                                :class="[
                                    'size-4 shrink-0 rounded border flex items-center justify-center',
                                    selected ? 'bg-primary-500 border-primary-500' : 'border-gray-300',
                                ]"
                            >
                                <CheckIcon v-if="selected" class="size-3 text-white" />
                            </span>
                            {{ opt[optionLabel] }}
                        </li>
                    </ListboxOption>
                </ListboxOptions>
            </Transition>
        </Listbox>
    </Input>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { ChevronDownIcon, CheckIcon } from '@heroicons/vue/24/outline'
import Input from '../Input/Input.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{
    options?: Record<string, any>[]
    optionLabel?: string
    optionValue?: string
    placeholder?: string
    selectedFirst?: boolean
    disabled?: boolean
}>(), {
    options: () => [],
    optionLabel: 'name',
    optionValue: 'value',
    placeholder: 'Выберите...',
})

const modelValue = defineModel<any[]>()

const selectedLabels = computed(() => {
    if (!modelValue.value?.length) return ''
    return props.options
        ?.filter(o => modelValue.value!.includes(o[props.optionValue]))
        .map(o => o[props.optionLabel])
        .join(', ')
})

const isOpen = ref(false)
const frozenOptions = ref<Record<string, any>[] | undefined>(undefined)

const sortBySelected = (options: Record<string, any>[]) => {
    const selected = new Set(modelValue.value)
    return [...options].sort((a, b) =>
        (selected.has(a[props.optionValue]) ? 0 : 1) - (selected.has(b[props.optionValue]) ? 0 : 1)
    )
}

watchEffect(() => {
    if (!props.selectedFirst || isOpen.value || !props.options) return
    frozenOptions.value = sortBySelected(props.options)
})

const sortedOptions = computed(() =>
    props.selectedFirst ? (frozenOptions.value ?? props.options) : props.options
)
</script>
