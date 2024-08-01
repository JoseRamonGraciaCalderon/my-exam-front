// stores/userStore.js
import { defineStore } from 'pinia';
import apiService from '@/services/apiService';
import { useAlertService } from '@/services/alertService';

export const useUserStore = defineStore('user', {
  state: () => ({
    users: []
  }),
  actions: {
    async fetchUsers() {
      try {
        const response = await apiService.getUsers();
        this.users = response.data.data;
      } catch (error) {
        const { showSnackbar } = useAlertService();
        showSnackbar('Error al obtener los usuarios: ' + error.message, 'error', 'mdi-alert');
      }
    },
    async createUser(user) {
      try {
        await apiService.createUser(user);
        const { showSnackbar } = useAlertService();
        showSnackbar('Usuario creado exitosamente', 'success', 'mdi-check');
        this.fetchUsers();
      } catch (error) {
        const { showSnackbar } = useAlertService();
        showSnackbar('Error al crear el usuario: ' + error.message, 'error', 'mdi-alert');
      }
    },
    async updateUser(user) {
      try {
        await apiService.updateUser(user);
        const { showSnackbar } = useAlertService();
        showSnackbar('Usuario actualizado exitosamente', 'success', 'mdi-check');
        this.fetchUsers();
      } catch (error) {
        const { showSnackbar } = useAlertService();
        showSnackbar('Error al actualizar el usuario: ' + error.message, 'error', 'mdi-alert');
      }
    },
    async deleteUser(userId) {
      try {
        await apiService.deleteUser(userId);
        const { showSnackbar } = useAlertService();
        showSnackbar('Usuario eliminado exitosamente', 'success', 'mdi-check');
        this.fetchUsers();
      } catch (error) {
        const { showSnackbar } = useAlertService();
        showSnackbar('Error al eliminar el usuario: ' + error.message, 'error', 'mdi-alert');
      }
    },
    async uploadUserFile(userId, formData) {
      try {
        await apiService.uploadUserFile(userId, formData);
        const { showSnackbar } = useAlertService();
        showSnackbar('Archivo subido exitosamente', 'success', 'mdi-check');
        this.fetchUsers();
      } catch (error) {
        const { showSnackbar } = useAlertService();
        showSnackbar('Error al subir el archivo: ' + error.message, 'error', 'mdi-alert');
      }
    },
    async removeFile(item) {
      item.file = null;
      item.pdfFilePath = null;
      await this.updateUser(item);
    },
    triggerFileInput(index) {
      const fileInput = document.querySelector(`#fileInput${index}`);
      if (fileInput) {
        fileInput.click();
      }
    }
  },
});
