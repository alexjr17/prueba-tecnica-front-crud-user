<template>
    <div class="min-h-screen bg-gray-50 p-6">
        <div class="max-w-3xl mx-auto">
            <!-- Main Content -->
            <div class="bg-white rounded-lg shadow mb-6">
                <!-- Loading Overlay -->
                <div v-if="loading"
                    class="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10 rounded-lg">
                    <div class="flex flex-col items-center">
                        <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                        <span class="mt-2 text-sm text-gray-600">Creating user...</span>
                    </div>
                </div>

                <!-- Error Alert -->
                <div v-if="error" class="p-4">
                    <div class="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div class="flex items-center">
                            <div class="flex-shrink-0">
                                <svg class="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div class="ml-3">
                                <h3 class="text-sm font-medium text-red-800">Error creating user</h3>
                                <div class="mt-2 text-sm text-red-700">{{ error }}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Form -->
                <div class="p-6 flex-1">
                    <h1 class="text-2xl font-semibold text-gray-900 text-center mb-4">Create New User</h1>
                    <UserFormBase :error="error" :loading="loading" submit-button-text="Create User"
                        @submit="handleSubmit" @cancel="router.push('/users')" />
                </div>

                <UserCreationConfirmationModal title="Usuario creado con exito!"
                    buttonText="Aceptar"
                    redirectRoute="users-index" @close="showConfirmationModal = false" v-if="showConfirmationModal"/>

            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios2 from '../../api/api_users';
import UserFormBase from './form/form.vue';
import UserCreationConfirmationModal from './modal/SuccessModal.vue';

const router = useRouter();
const loading = ref(false);
const error = ref(null);
const showConfirmationModal = ref(false);

const handleSubmit = async (formData) => {
    loading.value = true;
    error.value = null;

    try {
        const response = await axios2.post('/users', {
            nombres: formData.name,
            apellidos: formData.lastName,
            numero_telefono: formData.phone,
            email: formData.email,
            password: formData.password,
            password_confirmation: formData.password
        });
        if(response.status === 200){
            showConfirmationModal.value = true; // Show the confirmation modal
        }
    } catch (err) {
        if (err.response?.data?.message) {
            error.value = err.response.data.message;
        } else {
            error.value = 'An error occurred while creating the user. Please try again.';
        }
        console.error('Error creating user:', err);
    } finally {
        loading.value = false;
    }
};
</script>