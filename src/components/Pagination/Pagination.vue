<template>
    <div class="flex items-center gap-2">
        <span>
            {{ currentPage * rowsPerPage + 1 }}-{{
                Math.min((currentPage + 1) * rowsPerPage, props.totalRecords)
            }}
            from {{ props.totalRecords }}
        </span>
        <div>
            <Select
                :model-value="rowsPerPage"
                :options="limitOptions.map((o) => ({ name: o + ' / стр.', value: o }))"
                @update:model-value="changeRowsPerPage"
            />
        </div>
        <Button :disabled="currentPage === 0" outlined @click="changePage(0)">«</Button>
        <Button :disabled="currentPage === 0" outlined @click="changePage(currentPage - 1)">‹</Button>
        <span>{{ currentPage + 1 }} / {{ totalPages }}</span>
        <Button :disabled="currentPage >= totalPages - 1" outlined @click="changePage(currentPage + 1)">›</Button>
        <Button :disabled="currentPage >= totalPages - 1" outlined @click="changePage(totalPages - 1)">»</Button>
    </div>
</template>

<script setup lang="ts" generic="T = any">
import { computed } from "vue"
import type { ListRequest } from "../../utils/list"
import Select from "../Select/Select.vue"
import Button from "../Button/Button.vue"

const props = withDefaults(
    defineProps<{
        totalRecords?: number
        limit: number
        offset: number
        limitOptions?: number[]
    }>(),
    {
        totalRecords: 0,
        limitOptions: () => [20, 50, 100],
    }
)

const emit = defineEmits<{ refresh: [event: ListRequest<T>] }>()

const totalPages = computed(() => Math.ceil(props.totalRecords / props.limit))
const currentPage = computed(() => Math.ceil(props.offset / props.limit))
const rowsPerPage = computed(() => props.limit)

const changePage = (page: number) => {
    emit("refresh", { offset: page * props.limit, limit: props.limit })
}

const changeRowsPerPage = (rows: number) => {
    emit("refresh", { offset: 0, limit: rows })
}
</script>
