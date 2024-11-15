import { createRouter, createWebHistory } from 'vue-router'
import AuthRegister from '@/views/auth/AuthRegister.vue'
import AuthLogin from '@/views/auth/AuthLogin.vue'
import UserCIndex from '@/views/users/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/register',
      name: 'AuthRegister',
      component: AuthRegister,
      // meta: { requiresGuest: true } // Indica que esta ruta debería ser accesible solo para usuarios no autenticados
    },
    {
      path: '/login',
      name: 'AuthLogin',
      component: AuthLogin,
      // meta: { requiresGuest: true } // Indica que esta ruta debería ser accesible solo para usuarios no autenticados
    },
    {
      path: '/usuarios',
      name: 'users',
      component: UserCIndex,
      // meta: { requiresAuth: true } // Indica que esta ruta requiere autenticación
    },
    {
      path: '/:pathMatch(.*)*', // Ruta comodín para capturar todas las rutas no existentes
      redirect: '/login' // Redirige al login
    }
  ],
})

export default router
