<template>
    <div class="relative">
        <MagnifyingGlassIcon
            class="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-gray-400 pointer-events-none z-10"
        />
        <InputText
            :value="internalValue"
            class="pl-8! pr-8! w-full"
            v-bind="$attrs"
            @input="onInput"
        />
        <div class="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <svg
                v-if="loading"
                class="animate-spin size-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
            >
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <button
                v-else-if="internalValue"
                type="button"
                class="size-4 text-gray-400 hover:text-gray-600"
                @click="clear"
            >
                <XMarkIcon class="size-4" />
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"
import InputText from "../InputText/InputText.vue"
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/vue/24/outline"
import { useDebounceFn } from "@vueuse/core"

defineOptions({ inheritAttrs: false })

const {
    modelValue = "",
    debounce = 800,
    loading = false,
} = defineProps<{
    modelValue?: string
    debounce?: number
    loading?: boolean
}>()

const emit = defineEmits<{
    "update:modelValue": [value: string]
}>()

const internalValue = ref(modelValue)

watch(
    () => modelValue,
    (val) => {
        internalValue.value = val
    }
)

const emitDebounced = useDebounceFn((value: string) => {
    emit("update:modelValue", value)
}, debounce)

const onInput = (e: Event) => {
    internalValue.value = (e.target as HTMLInputElement).value
    emitDebounced(internalValue.value)
}

const clear = () => {
    internalValue.value = ""
    emit("update:modelValue", "")
}
</script>
