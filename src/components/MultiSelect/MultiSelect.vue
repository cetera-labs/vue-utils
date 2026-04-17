<template>
    <Input
        v-model="modelValue"
        :component="PrimeMultiSelect"
        :options="sortedOptions"
        :option-label="optionLabel"
        :option-value="optionValue"
        scroll-height="28rem"
        v-bind="{ ...$attrs, onShow, onHide }"
    >
        <template v-for="name in Object.keys($slots)" :key="name" #[name]="slotProps">
            <slot :name="name" v-bind="slotProps ?? {}" />
        </template>
    </Input>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from "vue"
import { MultiSelect as PrimeMultiSelect } from "primevue"
import Input from "../Input/Input.vue"

defineOptions({ inheritAttrs: false })

const modelValue = defineModel<any[]>()

const props = withDefaults(
    defineProps<{
        options?: any[]
        selectedFirst?: boolean
        optionLabel?: string
        optionValue?: string
    }>(),
    {
        options: undefined,
        optionLabel: "name",
        optionValue: "value",
    }
)

const isOpen = ref(false)
const frozenOptions = ref<any[] | undefined>(undefined)

const sortBySelected = (options: any[]) => {
    const field = props.optionValue
    const selected = new Set(modelValue.value)
    return [...options].sort((a, b) => {
        return (selected.has(a[field]) ? 0 : 1) - (selected.has(b[field]) ? 0 : 1)
    })
}

watchEffect(() => {
    if (!props.selectedFirst || isOpen.value || !props.options) return
    frozenOptions.value = sortBySelected(props.options)
})

const sortedOptions = computed(() => {
    if (!props.selectedFirst) return props.options
    return frozenOptions.value ?? props.options
})

const onShow = () => { isOpen.value = true }
const onHide = () => { isOpen.value = false }
</script>
