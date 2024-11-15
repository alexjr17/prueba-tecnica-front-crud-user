<template>
    <AppModal v-model="showModal">
        <div class="text-center">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Usuario creado con exito!</h3>
            <!-- <p class="text-gray-600 mb-6">
                The user has been created and can now log in.
            </p> -->
            <button @click="redirectToIndex"
                class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded">
                Aceptar
            </button>
        </div>
    </AppModal>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AppModal from './Modal.vue';

const router = useRouter();
const showModal = ref(true);

const redirectToIndex = () => {
    showModal.value = false;
    router.push({ name: 'users-index' });
};
</script>