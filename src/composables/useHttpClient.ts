import type { AxiosRequestConfig, AxiosResponse } from "axios"
import axios from "axios"
import { useNotify } from "./useNotify"

declare module "axios" {
    interface InternalAxiosRequestConfig {
        cancelPrevious?: boolean | string
    }
}

interface RequestConfig {
    baseURL?: string
    data?: any
    params?: any
    headers?: any
    signal?: AbortSignal
    cancelPrevious?: boolean | string
}

export interface Meta {
    total?: number
}

export interface HttpResponse<T> {
    message?: string
    status?: string
    errors?: Record<string, string | string[]>
    data?: T
    meta?: Meta
    cancelled?: boolean
}

export interface UseHttpOptions {
    baseURL: string
    onUnauthorized?: () => void
}

const requestController: Record<string, AbortController> = {}

export function useHttpClient(options: UseHttpOptions) {
    const notify = useNotify()

    const instance = axios.create({
        baseURL: options.baseURL,
        withCredentials: true,
        withXSRFToken: true,
    })

    instance.interceptors.request.use((config) => {
        if (config.cancelPrevious) {
            const key =
                config.cancelPrevious !== true
                    ? config.cancelPrevious
                    : `${config.method}_${config.url}`
            if (requestController[key]) {
                requestController[key].abort()
            }
            requestController[key] = new AbortController()
            config.signal = requestController[key].signal
        }
        return config
    })

    instance.interceptors.response.use(
        (response: AxiosResponse) => {
            if (response.data.message) {
                notify.success(response.data.message)
            }
            return response
        },
        (error: any) => {
            if (axios.isCancel(error)) {
                return Promise.reject(error)
            }
            if (error.response) {
                const { status } = error.response

                if (status >= 500 || status === 400) {
                    notify.error(
                        error.response.data.message ||
                            "Неизвестная ошибка приложения. Повторите действие позднее."
                    )
                } else if (status >= 422) {
                    notify.error(
                        error.response.data.message || "При сохранении формы произошли ошибки."
                    )
                } else if (status === 401) {
                    options.onUnauthorized?.()
                } else if (status === 403) {
                    notify.error("Действие недоступно!")
                } else if (status === 419) {
                    notify.error(
                        "Страница давно не обновлялась и ваша сессия была завершена. Для продолжения необходимо обновить страницу!"
                    )
                }
            }
            return Promise.reject(error)
        }
    )

    const request = async (config: AxiosRequestConfig): Promise<HttpResponse<any>> => {
        let result: Record<string, any> = {}
        try {
            result = (await instance.request(config)).data || {}
        } catch (e: any) {
            if (axios.isCancel(e)) return { cancelled: true }
            result = e.response?.data || {}
        }
        return result
    }

    async function get<T>(url: string, config?: RequestConfig): Promise<HttpResponse<T>> {
        return request({ ...config, url, method: "get" })
    }

    async function post<T>(url: string, config?: RequestConfig): Promise<HttpResponse<T>> {
        return request({ ...config, url, method: "post" })
    }

    async function patch<T>(url: string, config?: RequestConfig): Promise<HttpResponse<T>> {
        return request({ ...config, url, method: "patch" })
    }

    async function put<T>(url: string, config?: RequestConfig): Promise<HttpResponse<T>> {
        return request({ ...config, url, method: "put" })
    }

    async function destroy<T>(url: string, config?: RequestConfig): Promise<HttpResponse<T>> {
        return request({ ...config, url, method: "delete" })
    }

    async function download(url: string, config?: RequestConfig): Promise<void> {
        const response = await instance.request({
            ...config,
            url,
            method: "get",
            responseType: "blob",
        })
        const blob = new Blob([response.data], { type: response.data.type })
        const blobUrl = window.URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = blobUrl
        let fileName = "unknown"
        const contentDisposition = response.headers["content-disposition"]
        if (contentDisposition) {
            const fileNameMatch = contentDisposition.match(/filename=(.+)/)
            if (fileNameMatch && fileNameMatch.length === 2) fileName = fileNameMatch[1]
        }
        link.setAttribute("download", fileName)
        document.body.appendChild(link)
        link.click()
        link.remove()
        window.URL.revokeObjectURL(blobUrl)
    }

    return { get, post, patch, put, download, destroy }
}
