<template>
  <div class="w-[40%] max-w-[80%] mx-auto p-5 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold text-gray-800 mb-6">Inicia sesión</h2>
    
    <form @submit.prevent="login" class="space-y-6">
      <div class="space-y-2">
        <label 
          for="email" 
          class="block text-sm font-medium text-gray-700"
        >
          Correo
        </label>
        <input 
          type="text" 
          id="email" 
          v-model="email" 
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <div class="space-y-2">
        <label 
          for="password" 
          class="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input 
          type="password" 
          id="password" 
          v-model="password" 
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div 
        v-if="errorMessage" 
        class="p-4 text-red-700 bg-red-100 rounded-md"
        role="alert"
      >
        {{ errorMessage }}
      </div>
      
      <button 
        type="submit" 
        class="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-200"
      >
        Inicia sesión
      </button>

      <div class="text-center text-gray-600">
        <span>¿No tienes una cuenta?</span>
        <router-link 
          to="/register" 
          class="ml-1 text-blue-600 hover:text-blue-800 font-medium"
        >
          Regístrate
        </router-link>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios2 from '../../api/api_users';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();

const login = async () => {
  try {
    const response = await axios2.post('api/auth/login', {
      email: email.value,
      password: password.value
    });
    const { token, user } = response.data;
    localStorage.setItem('accessToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    if(token){
      setTimeout(() => {
        router.push({name: 'users-index'});
      }, 1000);
    }
  } catch (error) {
    if (error.response && (error.response.status === 401 || error.response.status === 400)) {
      errorMessage.value = 'Credenciales incorrectas. Por favor, inténtelo de nuevo.';
    } else {
      errorMessage.value = 'Error al iniciar sesión. Por favor, inténtelo de nuevo más tarde.';
    }
    console.log('Login failed:', error);
  }
};
</script>