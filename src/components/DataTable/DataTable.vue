<template>
    <div
        :class="scrollable ? 'overflow-auto' : ''"
        :style="scrollable && scrollHeight ? { maxHeight: scrollHeight } : {}"
    >
        <table class="w-full text-sm border-collapse">
            <thead>
                <tr>
                    <th
                        v-for="col in columns"
                        :key="col.field ?? col.header"
                        :class="[
                            'text-left px-3 py-2 font-semibold text-gray-600 bg-white border-b border-gray-200',
                            stickyHeader ? 'sticky top-0 z-10' : '',
                        ]"
                    >
                        {{ col.header }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(row, rowIndex) in value"
                    :key="rowIndex"
                    class="border-b border-gray-100 hover:bg-gray-50 transition"
                >
                    <td
                        v-for="col in columns"
                        :key="col.field ?? col.header"
                        class="px-3 py-2 text-gray-700"
                    >
                        <CellRenderer :render="col.bodySlot" :data="row" :field="col.field" />
                    </td>
                </tr>
                <tr v-if="!value?.length">
                    <td :colspan="columns.length" class="px-3 py-6 text-center text-gray-400">
                        Нет данных
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { computed, useSlots, defineComponent, h } from 'vue'
import Column from './Column.vue'

defineProps<{
    value?: Record<string, any>[]
    scrollHeight?: string
    scrollable?: boolean
    stickyHeader?: boolean
}>()

const slots = useSlots() as { default?: () => any[] }

const columns = computed(() => {
    return (slots.default?.() ?? [])
        .filter((vnode: any) => vnode.type === Column)
        .map((vnode: any) => ({
            field: vnode.props?.field as string | undefined,
            header: vnode.props?.header as string | undefined,
            bodySlot: (vnode.children as any)?.body as ((scope: { data: any }) => any) | undefined,
        }))
})

const CellRenderer = defineComponent({
    props: ['render', 'data', 'field'],
    setup(props) {
        return () => props.render
            ? props.render({ data: props.data })
            : h('span', props.field ? props.data?.[props.field] ?? '' : '')
    },
})
</script>
