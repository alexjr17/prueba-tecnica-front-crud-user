<template>
  <div class="w-[40%] max-w-[80%] mx-auto p-5 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold text-gray-800 mb-6">Registro</h2>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Nombre -->
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Nombres</label>
        <input 
          type="text" 
          id="name" 
          v-model="name" 
          required
          class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <small v-if="errors.name" class="text-red-600 text-sm mt-1 block">{{ errors.name }}</small>
      </div>

      <!-- Apellidos -->
      <div>
        <label for="lastname" class="block text-sm font-medium text-gray-700">Apellidos</label>
        <input 
          type="text" 
          id="lastname" 
          v-model="lastname" 
          required
          class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <small v-if="errors.lastname" class="text-red-600 text-sm mt-1 block">{{ errors.lastname }}</small>
      </div>

      <!-- Email -->
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Correo electrónico</label>
        <input 
          type="email" 
          id="email" 
          v-model="email" 
          required
          class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <small v-if="errors.email" class="text-red-600 text-sm mt-1 block">{{ errors.email }}</small>
      </div>

      <!-- Teléfono -->
      <div>
        <label for="phone" class="block text-sm font-medium text-gray-700">Número teléfono</label>
        <input 
          type="tel" 
          id="phone" 
          v-model="phone" 
          required
          class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <small v-if="errors.phone" class="text-red-600 text-sm mt-1 block">{{ errors.phone }}</small>
      </div>

      <!-- Contraseña -->
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
        <input 
          type="password" 
          id="password" 
          v-model="password" 
          required
          autocomplete="new-password"
          class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <small v-if="errors.password" class="text-red-600 text-sm mt-1 block">{{ errors.password }}</small>
      </div>

      <!-- Confirmar Contraseña -->
      <div>
        <label for="password_confirmation" class="block text-sm font-medium text-gray-700">Confirmar Contraseña</label>
        <input 
          type="password" 
          id="password_confirmation" 
          v-model="passwordConfirmation" 
          required
          autocomplete="new-password"
          class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <small v-if="errors.password_confirmation" class="text-red-600 text-sm mt-1 block">{{ errors.password_confirmation }}</small>
      </div>

      <!-- Mensaje de error general -->
      <div 
        v-if="errorMessage" 
        class="p-4 text-red-700 bg-red-100 rounded-md"
        role="alert"
      >
        {{ errorMessage }}
      </div>

      <!-- Botón de registro -->
      <button 
        type="submit" 
        class="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-200"
      >
        Registrarse
      </button>

      <!-- Link a login -->
      <div class="text-center text-gray-600">
        <span>¿Ya tienes una cuenta?</span>
        <router-link 
          to="/login" 
          class="ml-1 text-blue-600 hover:text-blue-800 font-medium"
        >
          Ingresa
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
const name = ref('');
const lastname = ref('');
const password = ref('');
const phone = ref('');
const passwordConfirmation = ref('');
const errorMessage = ref('');
const router = useRouter();
const errors = ref({});

const errorKeyMap = {
  'nombres': 'name',
  'apellidos': 'lastname',
  'correo': 'email',
  'contraseña': 'password',
  'confirmacion_contraseña': 'passwordConfirmation',
  'numero_telefono': 'phone'
};

const reformatErrors = (backendErrors) => {
  const reformattedErrors = {};

  Object.keys(backendErrors).forEach(backendKey => {
    const frontendKey = errorKeyMap[backendKey] || backendKey;
    reformattedErrors[frontendKey] = Array.isArray(backendErrors[backendKey])
      ? backendErrors[backendKey][0]
      : backendErrors[backendKey];
  });

  return reformattedErrors;
};

const validateForm = () => {
  const newErrors = {};

  if (!name.value.trim()) {
    newErrors.name = 'El nombre es requerido';
  }

  if (!lastname.value.trim()) {
    newErrors.lastname = 'El apellido es requerido';
  }

  if (!phone.value.trim()) {
    newErrors.phone = 'El numero telefono es requerido';
  }

  if (!email.value.trim()) {
    newErrors.email = 'El correo electrónico es requerido';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    newErrors.email = 'Por favor ingrese un correo electrónico válido';
  }

  if (!password.value) {
    newErrors.password = 'La contraseña es requerida';
  } else {
    if (password.value.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    }
    if (!/(?=.*[A-Za-z])(?=.*\d)/.test(password.value)) {
      newErrors.password = 'La contraseña debe contener al menos una letra y un número';
    }
  }

  if (!passwordConfirmation.value) {
    newErrors.password_confirmation = 'La confirmación de contraseña es requerida';
  } else if (password.value !== passwordConfirmation.value) {
    newErrors.password_confirmation = 'Las contraseñas no coinciden';
  }

  errors.value = newErrors;
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = async () => {
  errorMessage.value = '';
  errors.value = {};

  if (!validateForm()) {
    return;
  }

  try {
    const response = await axios2.post('api/auth/register', {
      nombres: name.value,
      apellidos: lastname.value,
      numero_telefono: phone.value,
      email: email.value,
      password: password.value,
      password_confirmation: passwordConfirmation.value
    });

    const { token, user } = response.data;
    if (token) {
      localStorage.setItem('accessToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      router.push('/chat');
    } else {
      errorMessage.value = 'Error inesperado, inténtelo de nuevo más tarde.';
    }
  } catch (error) {
    if (error.response?.status === 422 && error.response.data.errors) {
      errors.value = reformatErrors(error.response.data.errors);
    } else if (error.response?.status === 400) {
      errorMessage.value = 'Error en los datos de registro. Por favor, verifique los campos.';
    } else if (error.response?.status === 409) {
      errorMessage.value = 'El correo electrónico ya está registrado. Por favor, utilice otro.';
    } else {
      errorMessage.value = 'Error al registrar. Por favor, inténtelo de nuevo más tarde.';
      console.error('Registration failed:', error);
    }
  }
};
</script>