import apiClient from '@/axios';

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
