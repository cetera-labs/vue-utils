<template>
    <Input v-bind="$attrs">
        <textarea
            v-bind="attrsRest"
            :value="modelValue"
            :rows="rows"
            :class="[
                'w-full border rounded px-3 py-2 text-sm outline-none transition resize-none',
                'placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed',
                'border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500',
            ]"
            @input="onInput"
        />
    </Input>
</template>

<script setup lang="ts">
import { useAttrs } from 'vue'
import Input from '../Input/Input.vue'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
    rows?: number | string
    autoResize?: boolean
}>()

const modelValue = defineModel<string>()
const attrs = useAttrs()
const { class: _, style: __, autoResize: ___, rows: ____, ...attrsRest } = attrs

const onInput = (e: Event) => {
    const el = e.target as HTMLTextAreaElement
    modelValue.value = el.value
    if (props.autoResize) {
        el.style.height = 'auto'
        el.style.height = el.scrollHeight + 'px'
    }
}
</script>
