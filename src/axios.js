
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-Api-Key': process.env.VUE_APP_API_KEY 
}
});

// Puedes añadir interceptores si es necesario
instance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default instance;
