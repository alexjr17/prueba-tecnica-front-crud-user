<template>
    <AppModal v-model="showModal">
        <div class="text-center">
            <h3 class="text-lg font-medium text-gray-900 mb-4">{{ title }}</h3>
            <!-- <p class="text-gray-600 mb-6" v-if="message">
                {{ message }}
            </p> -->
            <button @click="handleModalClose"
                class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded">
                {{ buttonText }}
            </button>
        </div>
    </AppModal>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import { useRouter } from 'vue-router';
import AppModal from './Modal.vue';

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        default: ''
    },
    buttonText: {
        type: String,
        default: 'OK'
    },
    redirectRoute: {
        type: String,
        required: true
    }
});

const emits = defineEmits(['close']);

const router = useRouter();
const showModal = ref(true);

const handleModalClose = () => {
    showModal.value = false;
    router.push({ name: props.redirectRoute });
    emits('close');
};
</script>