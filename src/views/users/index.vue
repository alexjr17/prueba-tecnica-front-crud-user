<template>
  <div class="p-6">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Listado de Usuarios</h1>
      <div class="flex items-center gap-4">
        <ButtonComponent @click="navigateToCreate" variant="primary">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clip-rule="evenodd" />
            </svg>
          </template>
          Crear Usuario
        </ButtonComponent>
        <ButtonComponent @click="logout" variant="danger">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                clip-rule="evenodd" />
            </svg>
          </template>
          Cerrar Sesión
        </ButtonComponent>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow mb-6">
      <div class="p-4 border-b border-gray-200">
        <div class="flex flex-wrap gap-4">
          <div class="flex-1 min-w-[300px]">
            <SearchFilter v-model="filters.search" placeholder="Buscar por nombre, email..."
              @update:modelValue="debouncedSearch" />
          </div>
          <div class="flex items-center gap-2">
            <label class="text-sm text-gray-600">Mostrar:</label>
            <select v-model="filters.perPage"
              class="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              @change="handleFiltersChange">
              <option v-for="n in [10, 25, 50, 100]" :key="n" :value="n">{{ n }}</option>
            </select>
            <span class="text-sm text-gray-600">registros</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Table Container -->
    <div class="bg-white rounded-lg shadow overflow-hidden relative">
      <div v-if="loading" class="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
        <div class="flex flex-col items-center">
          <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          <span class="mt-2 text-gray-600">Cargando...</span>
        </div>
      </div>

      <div v-if="error" class="p-4">
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {{ error }}
        </div>
      </div>

      <DataTable :columns="columns" :current-sort="{ key: filters.sortBy, order: filters.sortOrder }" @sort="sortBy">
        <template #sort-icons="{ column, currentSort }">
          <div v-if="column.sortable" class="flex flex-col">
            <svg :class="[
              'w-3 h-3 transition-colors duration-200',
              currentSort.key === column.key && currentSort.order === 'asc'
                ? 'text-blue-600'
                : 'text-gray-400'
            ]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
            </svg>
            <svg :class="[
              'w-3 h-3 -mt-1 transition-colors duration-200',
              currentSort.key === column.key && currentSort.order === 'desc'
                ? 'text-blue-600'
                : 'text-gray-400'
            ]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </template>

        <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50">
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.id }}</td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-gray-900">{{ user.nombres }}</div>
            <div class="text-sm text-gray-500">{{ user.apellidos }}</div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-gray-900">{{ user.email }}</div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.numero_telefono }}</td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex justify-center space-x-2">
              <ButtonComponent variant="primary" @click="editUser(user)" class="p-1.5">
                <template #icon>
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </template>
              </ButtonComponent>
              <ButtonComponent variant="danger" @click="confirmDelete(user)" class="p-1.5">
                <template #icon>
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </template>
              </ButtonComponent>
            </div>
          </td>
        </tr>
      </DataTable>

      <!-- Empty state -->
      <div v-if="!loading && users.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No hay usuarios</h3>
        <p class="mt-1 text-sm text-gray-500">No se encontraron usuarios que coincidan con los criterios de búsqueda.
        </p>
      </div>

      <!-- Pagination -->
      <div v-if="pagination && users.length > 0" class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div class="text-sm text-gray-700">
            Mostrando <span class="font-medium">{{ pagination.from }}</span> a <span class="font-medium">{{
              pagination.to }}</span> de <span class="font-medium">{{ pagination.total }}</span> resultados
          </div>
          <div class="flex flex-wrap justify-center gap-2">
            <button v-for="link in pagination.links" :key="link.label" @click="goToPage(link.url)"
              :disabled="!link.url || link.active" :class="[
                'px-3 py-1 border rounded-md text-sm font-medium',
                link.active ? 'bg-blue-600 text-white border-blue-600' : 'text-gray-700 hover:bg-gray-50',
                !link.url && 'opacity-50 cursor-not-allowed'
              ]" v-html="link.label">
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <Modal v-model="showDeleteModal">
      <ModalDeleteConfirmation :title="`Eliminar a ${userToDelete?.nombres} ${userToDelete?.apellidos}`"
        @cancel="showDeleteModal = false" @confirm="deleteUser">
        ¿Está seguro que desea eliminar a este usuario? Esta acción no se puede deshacer.
      </ModalDeleteConfirmation>
    </Modal>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios2 from '../../api/api_users';
import ModalDeleteConfirmation from './modal/ModalDeleteConfirmation.vue'
import ButtonComponent from '@/components/ButtonComponent.vue';
import SearchFilter from './table/SearchFilter.vue';
import DataTable from '@/views/users/table/table.vue';
import Modal from './modal/Modal.vue';
import Pagination from './table/Pagination.vue';

// Custom debounce function
function debounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Estado
const users = ref([]);
const loading = ref(false);
const error = ref(null);
const showDeleteModal = ref(false);
const userToDelete = ref(null);
const pagination = ref(null);
const router = useRouter();

// Columnas de la tabla
const columns = [
  { key: 'id', label: 'ID', sortable: true },
  { key: 'nombres', label: 'Nombre', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'numero_telefono', label: 'Teléfono', sortable: true },
  { key: 'acciones', label: 'Acciones' }
];

// Filtros
const filters = ref({
  search: '',
  sortBy: 'id',
  sortOrder: 'desc',
  perPage: 10,
  page: 1
});

const fetchUsers = async () => {
  loading.value = true;
  error.value = null;

  try {
    const response = await axios2.get('/users', {
      params: {
        ...filters.value,
        sort_by: filters.value.sortBy,
        sort_order: filters.value.sortOrder,
        per_page: filters.value.perPage
      }
    });

    users.value = response.data.data;
    pagination.value = {
      current_page: response.data.current_page,
      from: response.data.from,
      to: response.data.to,
      total: response.data.total,
      last_page: response.data.last_page,
      links: response.data.links
    };
  } catch (err) {
    error.value = 'Error al cargar los usuarios. Por favor, intente de nuevo.';
    console.error('Error fetching users:', err);
  } finally {
    loading.value = false;
  }
};

// Debounce para la búsqueda usando función personalizada
const debouncedSearch = debounce(() => {
  filters.value.page = 1;
  fetchUsers();
}, 300);

const handleFiltersChange = () => {
  filters.value.page = 1;
  fetchUsers();
};

const sortBy = (column) => {
  // Si la columna es la misma, cambiamos el orden
  if (filters.value.sortBy === column) {
    filters.value.sortOrder = filters.value.sortOrder === 'asc' ? 'desc' : 'asc';
  } else {
    // Si es una columna diferente, la ordenamos ascendentemente
    filters.value.sortBy = column;
    filters.value.sortOrder = 'asc';
  }
  fetchUsers();
};

const goToPage = (url) => {
  if (!url) return;

  // Extraer el número de página de la URL
  const urlParams = new URLSearchParams(new URL(url).search);
  filters.value.page = parseInt(urlParams.get('page'));
  fetchUsers();
};

const navigateToCreate = () => {
  router.push('/users/create');
};

const editUser = (user) => {
  router.push(`/users/${user.id}/edit`);
};

const confirmDelete = (user) => {
  userToDelete.value = user;
  showDeleteModal.value = true;
};

const deleteUser = async () => {
  try {
    await axios2.delete(`/users/${userToDelete.value.id}`);
    showDeleteModal.value = false;
    userToDelete.value = null;
    
    if (users.value.length === 1 && pagination.value.current_page > 1) {
      filters.value.page--;
    }

    await fetchUsers();
  } catch (err) {
    console.error(response.error);
    error.value = 'Error al eliminar el usuario. Por favor, intente de nuevo.';
    console.error('Error deleting user:', err);
  }
};

const logout = async () => {
  try {
    await axios2.post('/auth/logout');

    localStorage.removeItem('accessToken');
    router.push('/login');
  } catch (err) {
    error.value = 'Error al cerrar sesión. Por favor, intente de nuevo.';
    console.error('Error logging out:', err);
  }
};

onMounted(() => {
  fetchUsers();
});
</script>