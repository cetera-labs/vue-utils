import type { Component } from "vue"

export interface InputProps {
    id?: string
    label?: string
    invalidMessage?: string
    helperText?: string
    component?: Component
}
