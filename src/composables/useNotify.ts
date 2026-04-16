import { ref } from "vue"

export interface Notification {
    id: number
    type: "success" | "error" | "warn" | "info"
    message: string
}

const notifications = ref<Notification[]>([])
let nextId = 0

export const useNotify = () => {
    const add = (type: Notification["type"], message: string, life: number) => {
        const id = nextId++
        notifications.value.push({ id, type, message })
        setTimeout(() => {
            notifications.value = notifications.value.filter((n) => n.id !== id)
        }, life)
    }

    return {
        notifications,
        add,
        success: (message: string) => add("success", message, 3000),
        info: (message: string) => add("info", message, 3000),
        warn: (message: string) => add("warn", message, 4000),
        error: (message: string) => add("error", message, 5000),
    }
}
