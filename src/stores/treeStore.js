// stores/treeStore.js
import { defineStore } from 'pinia';
import apiService from '@/services/apiService';
import { useAlertService } from '@/services/alertService';

export const useTreeStore = defineStore('tree', {
  state: () => ({
    tree: [],
  }),
  actions: {
    async fetchTree() {
      const { showSnackbar } = useAlertService();
      try {
        const response = await apiService.getTree();
        if (response.data.status === "Success") {
          this.tree = response.data.data;
        } else {
          showSnackbar('Error al obtener el árbol: ' + response.data.message, 'error', 'mdi-alert');
        }
      } catch (error) {
        showSnackbar('Error al obtener el árbol: ' + error.message, 'error', 'mdi-alert');
      }
    },
    async updateNode(nodeId, node) {
      const { showSnackbar } = useAlertService();
      try {
        await apiService.updateNode(nodeId, { node });
        this.fetchTree();
        showSnackbar('Nodo guardado exitosamente', 'success', 'mdi-check');
      } catch (error) {
        showSnackbar('Error al guardar el nodo: ' + error.message, 'error', 'mdi-alert');
      }
    },
    async createNode(node) {
      const { showSnackbar } = useAlertService();
      try {
        await apiService.createNode({ node });
        this.fetchTree();
        showSnackbar('Nodo creado exitosamente', 'success', 'mdi-check');
      } catch (error) {
        showSnackbar('Error al crear el nodo: ' + error.message, 'error', 'mdi-alert');
      }
    },
    async deleteNode(nodeId) {
      const { showSnackbar } = useAlertService();
      try {
        await apiService.deleteNode(nodeId);
        this.fetchTree();
        showSnackbar('Nodo eliminado exitosamente', 'success', 'mdi-check');
      } catch (error) {
        showSnackbar('Error al eliminar el nodo: ' + error.message, 'error', 'mdi-alert');
      }
    },
  },
});
