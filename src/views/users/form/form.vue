<template>
    <form @submit.prevent="$emit('submit', formData)" class="space-y-6">
        <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
            {{ error }}
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
                Nombres
            </label>
            <input type="text" v-model="formData.name"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingrese los nombres" />
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
                Apellidos
            </label>
            <input type="text" v-model="formData.lastName"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingrese los apellidos" />
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
                Email
            </label>
            <input type="email" v-model="formData.email"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingrese el email" />
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
                Teléfono
            </label>
            <input type="tel" v-model="formData.phone"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingrese el número de teléfono" />
        </div>

        <div v-if="submitButtonText != 'Actualizar'">
            <label class="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
            </label>
            <input type="password" v-model="formData.password"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingrese el número de teléfono" />
        </div>

        <div class="flex justify-end space-x-3">
            <!-- <button type="button" @click="$emit('cancel')" class="px-4 py-2 border rounded-lg hover:bg-gray-50">
                Cancelar
            </button> -->
            <button type="submit"
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                :disabled="loading">
                {{ submitButtonText }}
            </button>
        </div>
    </form>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    initialData: {
        type: Object,
        default: () => ({
            name: '',
            lastName: '',
            email: '',
            phone: '',
            password: ''
        })
    },
    error: {
        type: String,
        default: null
    },
    loading: {
        type: Boolean,
        default: false
    },
    submitButtonText: {
        type: String,
        default: 'Guardar'
    }
});

const emit = defineEmits(['submit', 'cancel']);

const formData = ref({ ...props.initialData });

// Actualizar formData cuando cambia initialData
watch(() => props.initialData, (newVal) => {
    formData.value = { ...newVal };
}, { deep: true });

// Validación
const validateForm = () => {
    const errors = [];

    if (!formData.value.name.trim()) {
        errors.push('El nombre es requerido');
    }

    if (!formData.value.lastName.trim()) {
        errors.push('Los apellidos son requeridos');
    }

    if (!formData.value.password.trim()) {
        errors.push('La contraseña es requerida');
    }

    if (!formData.value.email.trim()) {
        errors.push('El email es requerido');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
        errors.push('El email no es válido');
    }

    if (!formData.value.phone.trim()) {
        errors.push('El número de teléfono es requerido');
    } else if (!/^\+?[\d\s-]{8,}$/.test(formData.value.numero_telefono)) {
        errors.push('El número de teléfono no es válido');
    }

    return errors;
};

</script>