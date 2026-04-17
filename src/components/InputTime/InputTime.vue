<template>
    <Input v-bind="$attrs">
        <VueDatePicker
            v-model="internalValue"
            time-picker
            auto-apply
            :input-class-name="inputClass"
        >
            <template #input-icon>
                <ClockIcon class="size-4 text-gray-400 ml-2" />
            </template>
        </VueDatePicker>
    </Input>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { VueDatePicker } from '@vuepic/vue-datepicker'
import { ClockIcon } from '@heroicons/vue/24/outline'
import Input from '../Input/Input.vue'

defineOptions({ inheritAttrs: false })

const modelValue = defineModel<string | null>()

const inputClass = [
    'w-full border rounded px-3 py-2 text-sm outline-none transition',
    'placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed',
    'border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500',
].join(' ')

const internalValue = computed({
    get: () => {
        if (!modelValue.value) return null
        const [hours, minutes] = modelValue.value.split(':').map(Number)
        return { hours, minutes }
    },
    set: (val) => {
        if (val && typeof val === 'object' && 'hours' in val) {
            const h = String(val.hours).padStart(2, '0')
            const m = String(val.minutes).padStart(2, '0')
            modelValue.value = `${h}:${m}`
        } else {
            modelValue.value = null
        }
    },
})
</script>
