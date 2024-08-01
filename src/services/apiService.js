// src/services/apiService.js

import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://localhost:7293/api', // Ajusta la URL base según tu configuración
    headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': 'prueba' // Añade tu API key aquí
    }
});

// Puedes añadir interceptores si es necesario
apiClient.interceptors.request.use(
    config => {
        // Puedes añadir lógica aquí si es necesario
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default {
    getUsers() {
        return apiClient.get('/users');
    },
    getUser(id) {
        return apiClient.get(`/users/${id}`);
    },
    createUser(user) {
        return apiClient.post('/users', user);
    },
    updateUser(user) {
        return apiClient.put(`/users/${user.id}`, user);
    },
    deleteUser(id) {
        return apiClient.delete(`/users/${id}`);
    },
    uploadUserFile(userId, formData) {
        return apiClient.post(`/users/${userId}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    getTree() {
        return apiClient.get('/tree');
    },
    getNodeById(id) {
        return apiClient.get(`/tree/${id}`);
    },
    createNode(node) {
        return apiClient.post('/tree', node);
    },
    updateNode(id , node) {
        return apiClient.put(`/tree/${id}`, node);
    },
    deleteNode(id) {
        return apiClient.delete(`/tree/${id}`);
    }
};
