<template>
    <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
                <tr>
                    <th v-for="column in columns" :key="column.key" class="px-6 py-3 text-left"
                        :class="{ 'cursor-pointer hover:bg-gray-100': column.sortable }"
                        @click="column.sortable && $emit('sort', column.key)">
                        <div class="flex items-center gap-2">
                            <span class="text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {{ column.label }}
                            </span>
                            <slot name="sort-icons" :column="column" :current-sort="currentSort" v-if="column.sortable">
                            </slot>
                        </div>
                    </th>
                    <th v-if="$slots.actions" class="px-6 py-3 text-center">
                        <span class="text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Acciones
                        </span>
                    </th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
                <slot></slot>
            </tbody>
        </table>
    </div>
</template>

<script setup>
defineProps({
    columns: {
        type: Array,
        required: true
    },
    currentSort: {
        type: Object,
        default: () => ({
            key: '',
            order: 'asc'
        })
    }
});

defineEmits(['sort']);
</script>