import { ref, onMounted, onUpdated, computed, useSlots } from "vue"
import { v4 as uuidv4 } from "uuid"

interface Props {
    id?: string
    invalidMessage?: string
    helperText?: string
}

export function useFormElements(props: Readonly<Props>) {
    const isHelper = ref(false)
    const isInvalid = ref(false)
    const uuid = computed((): string => (props.id && props.id.length ? props.id : uuidv4()))
    const $slots = useSlots()

    const checkSlots = () => {
        isInvalid.value = !!(
            $slots["invalid-message"] ||
            (props.invalidMessage && props.invalidMessage.length)
        )
        isHelper.value =
            !isInvalid.value &&
            !!($slots["helper-text"] || (props.helperText && props.helperText.length))
    }

    onMounted(() => checkSlots())
    onUpdated(() => checkSlots())

    return { isHelper, isInvalid, uuid }
}
