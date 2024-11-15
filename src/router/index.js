import { createRouter, createWebHistory } from 'vue-router'
import AuthRegister from '@/views/auth/AuthRegister.vue'
import AuthLogin from '@/views/auth/AuthLogin.vue'
import UserCIndex from '@/views/users/index.vue'
import UserEdit from '@/views/users/Create.vue'
import UserCreate from '@/views/users/Edit.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/register',
      name: 'AuthRegister',
      component: AuthRegister,
      meta: { requiresGuest: true }
    },
    {
      path: '/login',
      name: 'AuthLogin',
      component: AuthLogin,
      meta: { requiresGuest: true }
    },
    {
      path: '/users',
      name: 'users-index',
      component: UserCIndex,
      meta: { requiresAuth: true }
    },
    {
      path: '/users/create',
      name: 'users-create',
      component: UserEdit,
      meta: { requiresAuth: true }
    },
    {
      path: '/users/:id/edit',
      name: 'users-edit',
      component: UserCreate,
      meta: { requiresAuth: true }
    },
    {
      path: '/:pathMatch(.*)*', // Ruta comodín para capturar todas las rutas no existentes
      redirect: '/login' // Redirige al login
    },
  ],
})

// Global navigation guard to check authentication
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest);
  const token = localStorage.getItem('accessToken');

  // If the route requires authentication and there's no token, redirect to login
  if (requiresAuth && !token) {
    next('/login');
  } 
  // If the route is for guests (login or register) and the user is already authenticated, redirect to chat
  else if (requiresGuest && token) {
    next('/users');
  }
  // If the route does not require authentication, proceed as normal
  else {
    next();
  }
});

export default router
