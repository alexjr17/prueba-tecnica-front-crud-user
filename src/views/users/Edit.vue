<!-- EditUser.vue -->
<template>
    <div class="p-6">
        <div class="max-w-2xl mx-auto">
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-2xl font-bold text-gray-800">Editar Usuario</h1>
                <button @click="router.push('/users')" class="px-4 py-2 border rounded-lg hover:bg-gray-50">
                    Volver
                </button>
            </div>

            <!-- Loading state -->
            <div v-if="loading" class="flex justify-center items-center py-8">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>

            <UserFormBase v-else :initial-data="userData" :error="error" :loading="loading"
                submit-button-text="Actualizar" @submit="handleSubmit" @cancel="router.push('/users')" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios2 from '../../api/api_users';
import UserFormBase from './form/form.Vue';

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

const fetchUser = async () => {
    loading.value = true;
    const {id} = route.params
    try {
        const response = await axios2.get(`/users/${id}`);
        const {user} = response.data
        userData.value = {
            name: user.nombres,
            lastName: user.apellidos,
            phone: user.numero_telefono,
            email: user.email
        };

    } catch (err) {
        error.value = 'Error al cargar los datos del usuario';
        console.error('Error fetching user:', err);
    } finally {
        loading.value = false;
    }
};

const handleSubmit = async (formData) => {
    loading.value = true;
    error.value = null;

    try {
        const response = await axios2.put(`/users/${route.params.id}`, {
            nombres: formData.name,
            apellidos: formData.lastName,
            numero_telefono: formData.phone,
            email: formData.email
        });

        const { user } = response.data;

        if( response.status == 200 && user ) {
            router.push('/users');
        }
    } catch (err) {
        error.value = 'Error al actualizar el usuario';
        console.error('Error updating user:', err);
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchUser();
});
</script>