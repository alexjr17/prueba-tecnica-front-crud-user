<template>
    <div class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div class="text-sm text-gray-700">
                Mostrando <span class="font-medium">{{ from }}</span> a
                <span class="font-medium">{{ to }}</span> de
                <span class="font-medium">{{ total }}</span> resultados
            </div>
            <div class="flex flex-wrap justify-center gap-2">
                <button v-for="link in links" :key="link.label" @click="$emit('page-change', link.url)"
                    :disabled="!link.url || link.active" :class="[
                        'px-3 py-1 border rounded-md text-sm font-medium',
                        link.active ? 'bg-blue-600 text-white border-blue-600' : 'text-gray-700 hover:bg-gray-50',
                        !link.url && 'opacity-50 cursor-not-allowed'
                    ]" v-html="link.label"></button>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    from: Number,
    to: Number,
    total: Number,
    links: Array
});

defineEmits(['page-change']);
</script>