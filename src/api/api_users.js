import axios from 'axios';

const axiosIns = axios.create({
  // baseURL: 'http://127.0.0.1:8000/api',
  baseURL: 'prueba-tecnica-crud-user-api-production.up.railway.app/api',
});

// Rutas que no requieren token
const publicRoutes = [
  '/auth/register',
  '/auth/login'
];

// Add request interceptor
axiosIns.interceptors.request.use(config => {
  // Obtener la ruta actual de la URL completa
  const currentPath = config.url.replace(config.baseURL, '');
  
  // Verificar si la ruta actual es una ruta pública
  const isPublicRoute = publicRoutes.some(route => currentPath.includes(route));
  
  if (!isPublicRoute) {
    // Si no es una ruta pública, verificar el token
    const token = localStorage.getItem('accessToken');
    
    if (!token) {
      // Si no hay token, redirigir al login
      window.location.href = '/login';
      return Promise.reject('No token available');
    }
    
    // Añadir el token al header
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
}, error => {
  return Promise.reject(error);
});

// Handle response errors
axiosIns.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // Obtener la ruta actual
      const currentPath = error.config.url.replace(error.config.baseURL, '');
      const isPublicRoute = publicRoutes.some(route => currentPath.includes(route));

      if (!isPublicRoute) {
        if (error.response.status === 401 || error.response.status === 403) {
          // Token inválido o expirado
          localStorage.removeItem('accessToken');
          localStorage.removeItem('user');
          window.location.href = '/login';
          return Promise.reject(error);
        } else if (
          error.response.status === 500 && 
          error.response.data.message === 'Token has expired'
        ) {
          // Token expirado
          localStorage.removeItem('accessToken');
          localStorage.removeItem('user');
          window.location.href = '/login';
          return Promise.reject(error);
        }
      }
      
      return Promise.reject(error);
    }
    
    return Promise.reject(error);
  }
);

// Función helper para verificar si una ruta es pública
const isPublicRoute = (route) => {
  return publicRoutes.some(publicRoute => route.includes(publicRoute));
};

export default axiosIns;