<template>
    <div class="min-h-screen bg-gray-50 p-6">
        <div class="max-w-3xl mx-auto">
            <!-- Header -->
            <div class="bg-white rounded-lg shadow-sm mb-6">
                <div class="px-6 py-4 border-b border-gray-200">
                    <div class="flex justify-between items-center">
                        <div class="flex items-center gap-3">
                            <button @click="router.push('/users')"
                                class="text-gray-500 hover:text-gray-700 transition-colors duration-200">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                            </button>
                            <h1 class="text-xl font-semibold text-gray-900">Crear Nuevo Usuario</h1>
                        </div>
                        <div class="flex items-center gap-3">
                            <button @click="router.push('/users')"
                                class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Main Content -->
            <div class="bg-white rounded-lg shadow-sm">
                <!-- Loading Overlay -->
                <div v-if="loading"
                    class="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10 rounded-lg">
                    <div class="flex flex-col items-center">
                        <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                        <span class="mt-2 text-sm text-gray-600">Creando usuario...</span>
                    </div>
                </div>

                <!-- Error Alert -->
                <!-- <div v-if="error" class="p-4">
                    <div class="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div class="flex items-center">
                            <div class="flex-shrink-0">
                                <svg class="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div class="ml-3">
                                <h3 class="text-sm font-medium text-red-800">Error al crear el usuario</h3>
                                <div class="mt-2 text-sm text-red-700">
                                    {{ error }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div> -->

                <!-- Form -->
                <div class="p-6">
                    <UserFormBase :error="error" :loading="loading" submit-button-text="Crear Usuario"
                        @submit="handleSubmit" @cancel="router.push('/users')" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios2 from '../../api/api_users';
import UserFormBase from './form/form.vue';

const router = useRouter();
const loading = ref(false);
const error = ref(null);

const handleSubmit = async (formData) => {
    loading.value = true;
    error.value = null;

    try {
        await axios2.post('/users', {
            // ...formData,

            nombres: formData.name,
            apellidos: formData.lastName,
            numero_telefono: formData.phone,
            email: formData.email,
            password: formData.password,
            password_confirmation: formData.password
        });
        router.push({name: 'users-index'});
    } catch (err) {
        if (err.response?.data?.message) {
            error.value = err.response.data.message;
        } else {
            error.value = 'Ha ocurrido un error al crear el usuario. Por favor, intente nuevamente.';
        }
        console.error('Error creating user:', err);
    } finally {
        loading.value = false;
    }
};
</script>