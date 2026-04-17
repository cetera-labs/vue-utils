export enum SortDirection {
    ASC = "asc",
    DESC = "desc",
}

export interface ListRequest<T = any, F = never> {
    filter?: { [key in keyof (T & F)]?: (T & F)[key] }
    limit?: number
    offset?: number
    query?: string
    sorts?: { [key in keyof T]?: SortDirection }
    sortKey?: keyof T
    sortDirection?: SortDirection
}
