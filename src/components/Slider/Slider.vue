<template>
    <Input v-bind="$attrs">
        <input
            type="range"
            v-model="modelValue"
            class="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-gray-200
                   [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-4
                   [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-500
                   [&::-webkit-slider-thumb]:cursor-pointer my-3"
        />
    </Input>
</template>

<script setup lang="ts">
import Input from '../Input/Input.vue'

defineOptions({ inheritAttrs: false })

const modelValue = defineModel<number[] | number>()
</script>
