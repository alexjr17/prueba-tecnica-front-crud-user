<template>
  <div class="container-auth">
    <h2>Registro</h2>

    <form @submit.prevent="handleSubmit">
      <div data-mdb-input-init class="form-outline mb-1">
        <label class="form-label" for="form3Example1">Nombres</label>
        <input type="text" class="form-control" id="name" v-model="name" required />
        <small class="text-danger" v-if="errors.name">{{ errors.name }}</small>
      </div>

      <div data-mdb-input-init class="form-outline mb-1">
        <label class="form-label" for="form3Example2">Apellidos</label>
        <input type="text" id="lastname" class="form-control" v-model="lastname" required />
        <small class="text-danger" v-if="errors.lastname">{{ errors.lastname }}</small>
      </div>

      <div data-mdb-input-init class="form-outline mb-1">
        <label class="form-label" for="form3Example3">Correo electrónico</label>
        <input type="email" class="form-control" id="email" v-model="email" required />
        <small class="text-danger" v-if="errors.email">{{ errors.email }}</small>
      </div>
      <div data-mdb-input-init class="form-outline mb-1">
        <label class="form-label" for="form3Example3">Numero telefono</label>
        <input type="phone" class="form-control" id="phone" v-model="phone" required />
        <small class="text-danger" v-if="errors.phone">{{ errors.phone }}</small>
      </div>

      <div data-mdb-input-init class="form-outline mb-1">
        <label class="form-label" for="form3Example4">Contraseña</label>
        <input type="password" class="form-control" id="password" v-model="password" required
          autocomplete="new-password" />
        <small class="text-danger" v-if="errors.password">{{ errors.password }}</small>
      </div>

      <div data-mdb-input-init class="form-outline mb-1">
        <label class="form-label" for="password_confirmation">Confirmar Contraseña</label>
        <input type="password" class="form-control" id="password_confirmation" v-model="passwordConfirmation" required
          autocomplete="new-password" />
        <small class="text-danger" v-if="errors.password_confirmation">{{ errors.password_confirmation }}</small>
      </div>

      <!-- Alert for errors -->
      <!-- <div v-if="errorMessage" class="alert alert-danger" role="alert"> -->
      {{ errorMessage }}
      <!-- </div> -->

      <button data-mdb-ripple-init type="submit" class="btn btn-primary btn-block mb-4">Registrarse</button>

      <div class="link">
        <span>Ya tienes una cuenta?</span> <router-link to="/login">Ingresa</router-link>
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

// Mapeo de keys del backend a keys del frontend
const errorKeyMap = {
  'nombres': 'name',
  'apellidos': 'lastname',
  'correo': 'email',
  'contraseña': 'password',
  'confirmacion_contraseña': 'passwordConfirmation',
  'numero_telefono': 'phone'
};

// Función para reformatear errores del backend de laravel
const reformatErrors = (backendErrors) => {
  const reformattedErrors = {};

  Object.keys(backendErrors).forEach(backendKey => {
    // Obtiene la key correspondiente del frontend o usa la key del backend si no hay mapeo
    const frontendKey = errorKeyMap[backendKey] || backendKey;

    reformattedErrors[frontendKey] = Array.isArray(backendErrors[backendKey])
      ? backendErrors[backendKey][0]
      : backendErrors[backendKey];
  });

  return reformattedErrors;
};

const validateForm = () => {
  const newErrors = {};

  // Validación del nombre
  if (!name.value.trim()) {
    newErrors.name = 'El nombre es requerido';
  }

  // Validación del apellido
  if (!lastname.value.trim()) {
    newErrors.lastname = 'El apellido es requerido';
  }
  // Validación del apellido
  if (!phone.value.trim()) {
    newErrors.phone = 'El numero telefono es requerido';
  }

  // Validación del email
  if (!email.value.trim()) {
    newErrors.email = 'El correo electrónico es requerido';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    newErrors.email = 'Por favor ingrese un correo electrónico válido';
  }

  // Validación de la contraseña
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

  // Validación de la confirmación de contraseña
  if (!passwordConfirmation.value) {
    newErrors.password_confirmation = 'La confirmación de contraseña es requerida';
  } else if (password.value !== passwordConfirmation.value) {
    newErrors.password_confirmation = 'Las contraseñas no coinciden';
  }

  errors.value = newErrors;
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = async () => {
  // Limpiar mensajes de error
  errorMessage.value = '';
  errors.value = {};

  // Validar el formulario antes de enviar
  if (!validateForm()) {
    return;
  }

  try {
    const response = await axios2.post('/auth/register', {
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
      console.log(response.data);

      errorMessage.value = 'Error inesperado, inténtelo de nuevo más tarde.';
    }
  } catch (error) {
    if (error.response?.status === 422 && error.response.data.errors) {
      console.error(error.response.data.errors);
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

<style scoped>
.container-auth {
  width: 40% !important;
  max-width: 80% !important;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.alert {
  margin-top: 10px;
}

.text-danger {
  color: #dc3545;
  font-size: 0.875em;
  margin-top: 0.25rem;
}
</style>