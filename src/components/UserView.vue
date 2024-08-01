<template>
  <v-container class="fill-height pa-6">
    <v-row>
      <user-table
        :users="users"
        @createUser="openUserForm"
        @editUser="editUser"
        @deleteUser="confirmDeleteUser"
        @fileChanged="confirmUpload"
        @exportToExcel="exportToExcel"
        @exportToCsv="exportToCsv"
      ></user-table>
    </v-row>

    <user-form
      v-model:dialog="dialog"
      :user="currentUser"
      :edit="isEdit"
      ref="userForm"
      @save="saveUser"
      @close="closeUserForm"
    ></user-form>

    <!-- Diálogo para confirmar carga de archivo -->
    <v-dialog v-model="confirmDialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">Confirmar Carga</v-card-title>
        <v-card-text>¿Estás seguro de que deseas cargar este archivo?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeConfirmDialog">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="uploadFile">Cargar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Diálogo para confirmar eliminación de usuario -->
    <v-dialog v-model="confirmDeleteDialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">Confirmar Eliminación</v-card-title>
        <v-card-text>¿Estás seguro de que deseas eliminar este usuario?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeConfirmDeleteDialog">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="deleteUserM">Eliminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <alerts-service></alerts-service>
  </v-container>
</template>

<script>
import { computed } from 'vue';
import UserTable from '@/components/UserTable.vue';
import UserForm from '@/components/UserForm.vue';
import AlertsService from '@/components/AlertsService.vue';
import { generateCsvReport, generateExcelReport } from '@/services/reportService';
import { useUserStore } from '@/stores/userStore';
import { useAlertService } from '@/services/alertService';

export default {
  components: {
    UserTable,
    UserForm,
    AlertsService
  },
  setup() {
    const userStore = useUserStore();
    const { showSnackbar } = useAlertService();

    const users = computed(() => userStore.users);

    userStore.fetchUsers();

    return {
      users,
      fetchUsers: userStore.fetchUsers,
      createUser: userStore.createUser,
      updateUser: userStore.updateUser,
      deleteUser: userStore.deleteUser,
      uploadUserFile: userStore.uploadUserFile,
      showSnackbar
    };
  },
  data() {
    return {
      currentUser: null,
      isEdit: false,
      dialog: false,
      confirmDialog: false,
      confirmDeleteDialog: false,
      fileToUpload: null,
      userToUpload: null,
      userToDelete: null,
    };
  },
  methods: {
    openUserForm() {
      this.currentUser = { name: '', email: '' };
      this.isEdit = false;
      this.dialog = true;
    },
    editUser(user) {
      this.currentUser = { ...user };
      this.isEdit = true;
      this.dialog = true;
    },
    saveUser(user) {
      if (this.isEdit) {
        this.updateUser(user);
      } else {
        this.createUser(user);
      }
      this.dialog = false;
      this.currentUser = null;
    },
    closeUserForm() {
      this.dialog = false;
      this.currentUser = null;
    },
    confirmUpload(item) {
      this.userToUpload = item;
      this.fileToUpload = item.file;
      this.confirmDialog = true;
    },
    closeConfirmDialog() {
      this.confirmDialog = false;
      this.fileToUpload = null;
      this.userToUpload = null;
    },
    uploadFile() {
      const formData = new FormData();
      formData.append('file', this.fileToUpload);
      this.uploadUserFile(this.userToUpload.id, formData);
      this.confirmDialog = false;
      this.fileToUpload = null;
      this.userToUpload = null;
    },
    confirmDeleteUser(userId) {
      this.userToDelete = userId;
      this.confirmDeleteDialog = true;
    },
    closeConfirmDeleteDialog() {
      this.confirmDeleteDialog = false;
      this.userToDelete = null;
    },
    deleteUserM() {
      this.deleteUser(this.userToDelete);
      this.confirmDeleteDialog = false;
      this.userToDelete = null;
    },
    exportToCsv() {
      generateCsvReport(this.users);
      this.showSnackbar('Informe CSV generado', 'success', 'mdi-check');
    },
    exportToExcel() {
      generateExcelReport(this.users);
      this.showSnackbar('Informe Excel generado', 'success', 'mdi-check');
    }
  }
};
</script>

<style>
html, body, #app {
  height: 100%;
  margin: 0;
}

.fill-height {
  height: 100%;
}

.v-container {
  padding: 0;
  width: 100% !important;
  max-width: none !important;
}
</style>
