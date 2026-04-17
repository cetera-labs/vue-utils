<template>
    <Input v-model="modelValue" v-bind="$attrs">
        <InputText
            type="number"
            :value="modelValue ?? ''"
            fluid
            v-bind="$attrs"
            @input="onInput"
        />
    </Input>
</template>

<script setup lang="ts">
import Input from '../Input/Input.vue'
import InputText from '../InputText/InputText.vue'

defineOptions({ inheritAttrs: false })

const modelValue = defineModel<number | null>()

const onInput = (e: Event) => {
    const val = (e.target as HTMLInputElement).value
    modelValue.value = val === '' ? null : Number(val)
}
</script>
