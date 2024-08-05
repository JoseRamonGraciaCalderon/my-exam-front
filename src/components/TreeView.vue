<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-treeview
          :items="tree"
          activatable
          item-key="id"
          open-on-click
          item-title="name"
          item-value="id"
        >
          <template v-slot:prepend="{ item }">
            <v-icon v-if="item.children && item.children.length">mdi-folder</v-icon>
            <v-icon v-else>mdi-file</v-icon>
          </template>
          <template v-slot:append="{ item }">
            <v-icon small @click.stop="promptAddChildNode(item)">mdi-plus</v-icon>
            <v-icon small @click.stop="promptEditNode(item)">mdi-pencil</v-icon>
            <v-icon small @click.stop="confirmDeleteNode(item.id)">mdi-delete</v-icon>
          </template>
        </v-treeview>
      </v-col>
    </v-row>
    <v-btn color="primary" @click="promptAddNode"><v-icon small>mdi-plus</v-icon></v-btn>

    <alerts-service></alerts-service>

    <!-- Dialogo para agregar/editar nodos -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">{{ dialogTitle }}</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-model="dialogNode.name"
              label="Nombre del Nodo"
              :rules="nameRules"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="saveNode">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialogo para confirmar eliminación -->
    <v-dialog v-model="deleteDialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">Confirmar Eliminación</v-card-title>
        <v-card-text>¿Estás seguro de que deseas eliminar este nodo?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDeleteDialog">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="deleteNodes">Eliminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import AlertsService from '@/components/AlertsService.vue';
import { VTreeview } from 'vuetify/labs/VTreeview';
import { useAlertService } from '@/services/alertService';
import { useTreeStore } from '@/stores/treeStore';
import { computed } from 'vue';
export default {
  components: {
    VTreeview,
    AlertsService,
  },
  setup() {
    const treeStore = useTreeStore();
    const { showSnackbar } = useAlertService();

    const tree = computed(() => treeStore.tree);
    const nameRules = [
      v => !!v || 'Este campo es requerido',
      v => (v && v.length >= 3) || 'El nombre debe tener al menos 3 caracteres',
      v => (v && v.length <= 30) || 'El nombre debe tener menos de 30 caracteres',
    ];

    return {
      tree,
      showSnackbar,
      fetchTree: treeStore.fetchTree,
      createNode: treeStore.createNode,
      updateNode: treeStore.updateNode,
      deleteNode: treeStore.deleteNode,
      nameRules,
    };
  },
  data() {
    return {
      valid: false,
      selectedNode: null,
      dialog: false,
      dialogTitle: '',
      dialogNode: { name: '' },
      dialogParentNodeId: null,
      deleteDialog: false,
      nodeIdToDelete: null,
    };
  },
  methods: {
    findNodeById(items, id) {
      for (const item of items) {
        if (item.id === id) {
          return item;
        }
        if (item.children) {
          const found = this.findNodeById(item.children, id);
          if (found) {
            return found;
          }
        }
      }
      return null;
    },
    async promptAddNode() {
      this.dialogTitle = 'Agregar Nodo Raíz';
      this.dialogNode = { name: '' };
      this.dialogParentNodeId = null;
      this.dialog = true;
    },
    async promptAddChildNode(parentNode) {
      this.dialogTitle = 'Agregar Nodo Hijo';
      this.dialogNode = { name: '' };
      this.dialogParentNodeId = parentNode.id;
      this.dialog = true;
    },
    async promptEditNode(node) {
      this.dialogTitle = 'Editar Nodo';
      this.dialogNode = { ...node };
      this.dialogParentNodeId = null;
      this.dialog = true;
    },
    async saveNode() {
      this.$refs.form.validate();
      if (this.valid) {
        try {
          if (this.dialogParentNodeId) {
            const parentNode = this.findNodeById(this.tree, this.dialogParentNodeId);
            if (parentNode) {
              parentNode.children = parentNode.children || [];
              parentNode.children.push({ name: this.dialogNode.name, children: [] });
              await this.updateNode(this.dialogParentNodeId, parentNode);
            }
          } else if (this.dialogNode.id) {
            await this.updateNode(this.dialogNode.id, this.dialogNode);
          } else {
            await this.createNode(this.dialogNode);
          }
          this.fetchTree();
          this.closeDialog();
        } catch (error) {
          this.showSnackbar('Error al guardar el nodo: ' + error.message, 'error', 'mdi-alert');
        }
      }
    },
    async confirmDeleteNode(nodeId) {
      this.nodeIdToDelete = nodeId;
      this.deleteDialog = true;
    },
    async deleteNodes() {
      try {
        await this.deleteNode(this.nodeIdToDelete);
        this.fetchTree();
        this.closeDeleteDialog();
      } catch (error) {
        this.showSnackbar('Error al eliminar el nodo: ' + error.message, 'error', 'mdi-alert');
      }
    },
    closeDialog() {
      this.dialog = false;
    },
    closeDeleteDialog() {
      this.deleteDialog = false;
    },
  },
  mounted() {
    this.fetchTree();
  },
};
</script>

<style>
.fill-height {
  height: 100vh;
}
</style>
