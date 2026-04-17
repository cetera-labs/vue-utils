<template>
    <Input v-bind="$attrs">
        <VueDatePicker
            v-model="internalValue"
            :time-config="{ enableTimePicker: false }"
            :month-change-on-scroll="false"
            auto-apply
            :formats="{ input: formatDisplay }"
            :input-class-name="inputClass"
        >
            <template #input-icon>
                <CalendarDaysIcon class="size-4 text-gray-400 ml-2" />
            </template>
        </VueDatePicker>
    </Input>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { VueDatePicker } from '@vuepic/vue-datepicker'
import { format, parseISO } from 'date-fns'
import { CalendarDaysIcon } from '@heroicons/vue/24/outline'
import Input from '../Input/Input.vue'

defineOptions({ inheritAttrs: false })

const modelValue = defineModel<string | null>()

const formatDisplay = (date: Date) => format(date, 'dd.MM.yyyy')

const inputClass = [
    'w-full border rounded px-3 py-2 text-sm outline-none transition',
    'placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed',
    'border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500',
].join(' ')

const internalValue = computed({
    get: () => {
        if (!modelValue.value) return null
        try { return parseISO(modelValue.value) } catch { return null }
    },
    set: (val) => {
        modelValue.value = val instanceof Date ? format(val, 'yyyy-MM-dd') : null
    },
})
</script>
