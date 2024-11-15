<template>
    <div class="mb-4">
        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
        </div>
        <h3 class="mt-4 text-lg font-medium text-gray-900 text-center">{{ title }}</h3>
        <p class="mt-2 text-sm text-gray-500 text-center">
            <slot></slot>
        </p>
    </div>
    <div class="flex justify-end space-x-3">
        <ButtonComponent variant="secondary" @click="$emit('cancel')">
            Cancelar
        </ButtonComponent>
        <ButtonComponent variant="danger" @click="$emit('confirm')">
            Eliminar
        </ButtonComponent>
    </div>
</template>

<script setup>
import ButtonComponent from '../../../components/ButtonComponent.vue';

defineProps({
    title: {
        type: String,
        default: 'Confirmar Eliminación'
    }
});

defineEmits(['cancel', 'confirm']);
</script>