import { ref } from "vue"

export type ErrorsData = { [key: string]: string | string[] }

export function useErrors() {
    const errors = ref<ErrorsData>({})

    const has = (field: string) => field in errors.value

    const any = () => Object.keys(errors.value).length > 0

    const get = (field: string): string => {
        const error = errors.value[field] ?? []
        return Array.isArray(error) ? error.join(", ") : error
    }

    const set = (error: { path: string; value: string }) => {
        errors.value[error.path] = error.value
    }

    const record = (data?: ErrorsData) => {
        errors.value = data ?? {}
    }

    const clear = (field?: string) => {
        if (field) {
            const next = { ...errors.value }
            delete next[field]
            errors.value = next
        } else {
            errors.value = {}
        }
    }

    return { has, any, get, set, record, clear }
}
