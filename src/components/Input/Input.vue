<template>
    <div class="w-full" :class="attrs.class" :style="attrs.style">
        <label v-if="label" :for="uuid" v-html="label" />
        <slot>
            <Component :is="component" :id="uuid" v-bind="attrsRest" v-model="modelValue" fluid>
                <template v-for="name in Object.keys($slots)" :key="name" #[name]="slotProps">
                    <slot :name="name" v-bind="slotProps ?? {}" />
                </template>
            </Component>
        </slot>
        <p v-if="isInvalid" class="mt-1 text-xs text-red-600">
            <slot name="invalid-message">{{ invalidMessage }}</slot>
        </p>
        <p v-if="isHelper" class="mt-1 text-xs text-gray-400">
            <slot name="helper-text">{{ helperText }}</slot>
        </p>
    </div>
</template>

<script setup lang="ts">
import { computed, useAttrs } from "vue"
import InputText from "../InputText/InputText.vue"
import { useFormElements } from "../../composables"
import type { InputProps } from "./types"

const modelValue = defineModel<string | number | Date | null | (string | number | null)[]>()

const props = withDefaults(defineProps<InputProps>(), {
    id: undefined,
    label: undefined,
    invalidMessage: undefined,
    helperText: undefined,
    component: () => InputText,
})

const { isInvalid, isHelper, uuid } = useFormElements(props)

const attrs = useAttrs()
const attrsRest = computed(() => {
    const { class: _, style: __, ...rest } = attrs
    return rest
})
</script>

<script lang="ts">
export default {
    inheritAttrs: false,
}
</script>
