<template>
    <Input v-bind="$attrs">
        <InputText
            type="time"
            :value="modelValue ?? ''"
            fluid
            v-bind="$attrs"
            @change="onChange"
        />
    </Input>
</template>

<script setup lang="ts">
import Input from '../Input/Input.vue'
import InputText from '../InputText/InputText.vue'

defineOptions({ inheritAttrs: false })

const modelValue = defineModel<string | null>()

const onChange = (e: Event) => {
    const val = (e.target as HTMLInputElement).value
    modelValue.value = val || null
}
</script>
