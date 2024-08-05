import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-Api-Key': process.env.VUE_APP_API_KEY 
  }
});

// Interceptor de solicitudes (opcional)
instance.interceptors.request.use(
  config => {
    // Puedes añadir lógica adicional aquí si es necesario
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Interceptor de respuestas
instance.interceptors.response.use(
  response => {
    // Puedes añadir lógica adicional aquí para procesar las respuestas exitosas
    return response;
  },
  error => {
    if (error.response) {
      console.error('Error en la respuesta del servidor:', error.response.data);
      console.error('Código de estado:', error.response.status);
      console.error('Encabezados:', error.response.headers);

      switch (error.response.status) {
        case 400:
          // Manejo de errores 400 (Bad Request)
          alert('Solicitud incorrecta.');
          break;
        case 401:
          // Manejo de errores 401 (Unauthorized)
          alert('No autorizado.');
          break;
        case 404:
          // Manejo de errores 404 (Not Found)
          alert('Recurso no encontrado.');
          break;
        case 500:
          // Manejo de errores 500 (Internal Server Error)
          alert('Error interno del servidor.');
          break;
        default:
          // Manejo de otros errores
          alert('Ocurrió un error. Por favor, inténtalo de nuevo.');
      }
    } else if (error.request) {

      console.error('No se recibió respuesta:', error.request);
      alert('No se recibió respuesta del servidor. Por favor, verifica tu conexión.');
    } else {
      console.error('Error en la configuración de la solicitud:', error.message);
      alert('Error al configurar la solicitud. Por favor, inténtalo de nuevo.');
    }
    return Promise.reject(error);
  }
);

export default instance;
