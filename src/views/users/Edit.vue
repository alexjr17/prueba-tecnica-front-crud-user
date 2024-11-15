<template>
    <div class="p-6">
        <div class="max-w-2xl mx-auto">
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-2xl font-bold text-gray-800">Edit User</h1>
            </div>

            <!-- Loading state -->
            <div v-if="loading" class="flex justify-center items-center py-8">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>

            <UserFormBase v-else :initial-data="userData" :error="error" :loading="loading" submit-button-text="Update"
                @submit="handleSubmit" @cancel="router.push('/users')" />
        </div>
    </div>

    <UserCreationConfirmationModal v-if="showUpdateModal" title="Usuario actualizada!"
        buttonText="Aceptar" redirectRoute="users-index" @close="showUpdateModal = false" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios2 from '../../api/api_users';
import UserFormBase from './form/form.vue';
import UserCreationConfirmationModal from './modal/SuccessModal.vue';

const router = useRouter();
const route = useRoute();
const loading = ref(false);
const error = ref(null);
const userData = ref({
    name: '',
    lastName: '',
    email: '',
    phone: ''
});
const showUpdateModal = ref(false);

const fetchUser = async () => {
    loading.value = true;
    const { id } = route.params;
    try {
        const response = await axios2.get(`/users/${id}`);
        const { user } = response.data;
        userData.value = {
            name: user.nombres,
            lastName: user.apellidos,
            phone: user.numero_telefono,
            email: user.email
        };
    } catch (err) {
        error.value = 'Error loading user data';
        console.error('Error fetching user:', err);
    } finally {
        loading.value = false;
    }
};

const handleSubmit = async (formData) => {
    loading.value = true;
    error.value = null;

    try {
        const response = await axios2.put(`api/users/${route.params.id}`, {
            nombres: formData.name,
            apellidos: formData.lastName,
            numero_telefono: formData.phone,
            email: formData.email
        });
        const {state, user} = response.data;
        if(response.status === 200){
            showUpdateModal.value = true;
        }
    } catch (err) {
        error.value = 'Error updating user';
        console.error('Error updating user:', err);
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchUser();
});
</script>