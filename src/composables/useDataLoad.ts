import { ref, type Ref } from "vue"
import type { HttpResponse, Meta } from "./useHttpClient"

export function useDataLoad<T, P = void>(
    apiFn: (params: P) => Promise<HttpResponse<T>>,
    state?: { data?: Ref<T | undefined>; loading?: Ref<boolean> }
) {
    const data = state?.data ?? ref<T | undefined>(undefined)
    const meta = ref<Meta | undefined>(undefined)
    const loading = state?.loading ?? ref<boolean>(false)

    async function load(cached?: boolean): Promise<void>
    async function load(params: P, cached?: boolean): Promise<void>
    async function load(paramsOrCached?: P | boolean, cached = false): Promise<void> {
        let params: P
        let isCached: boolean

        if (typeof paramsOrCached === "boolean") {
            params = undefined as P
            isCached = paramsOrCached
        } else {
            params = paramsOrCached as P
            isCached = cached
        }

        if (isCached && (data.value !== undefined || loading.value)) return
        loading.value = true
        const response = await apiFn(params)
        if (response.cancelled) return
        if (response?.data) {
            data.value = response.data
            if (response.meta) meta.value = response.meta
        }
        loading.value = false
    }

    return { data, meta, loading, load }
}
