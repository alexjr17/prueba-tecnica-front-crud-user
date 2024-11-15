<template>
    <div class="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white">
        <!-- Imagen de la carta -->
        <img class="w-full h-48 object-cover" :src="imageUrl" :alt="imageAlt">

        <!-- Contenido de la carta -->
        <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2 text-gray-800">{{ title }}</div>
            <p class="text-gray-600 text-base">
                {{ description }}
            </p>
        </div>

        <!-- Footer de la carta con etiquetas -->
        <div class="px-6 pt-4 pb-2">
            <span v-for="(tag, index) in tags" :key="index"
                class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #{{ tag }}
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Card',
    props: {
        imageUrl: {
            type: String,
            required: true
        },
        imageAlt: {
            type: String,
            default: 'Card image'
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        tags: {
            type: Array,
            default: () => []
        }
    }
}
</script>