<template>
    <button :class="[
        'px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2',
        variants[variant],
        disabled && 'opacity-50 cursor-not-allowed'
    ]" :disabled="disabled" @click="$emit('click')">
        <slot name="icon"></slot>
        <slot></slot>
    </button>
</template>

<script setup>
const props = defineProps({
    variant: {
        type: String,
        default: 'primary',
        validator: (value) => ['primary', 'danger', 'secondary'].includes(value)
    },
    disabled: {
        type: Boolean,
        default: false
    }
});

const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
};
</script>