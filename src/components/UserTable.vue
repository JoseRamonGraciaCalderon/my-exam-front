<template>
    <v-container>
      <v-toolbar flat>
        <v-toolbar-title>Gestión de Usuarios</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="success" @click="$emit('exportToExcel')">Exportar a Excel</v-btn>
        <v-btn color="info" class="ml-2" @click="$emit('exportToCsv')">Exportar a CSV</v-btn>
      </v-toolbar>
      <v-card title="Usuarios" flat>
        <template v-slot:text>
          <v-text-field
            v-model="search"
            label="Buscar"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            hide-details
            single-line
          ></v-text-field>
        </template>
        <v-data-table :headers="headers" :items="filteredUsers" :search="search" item-key="id" class="elevation-1">
          <template v-slot:top>
            <v-toolbar flat>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="$emit('createUser')">Agregar Usuario</v-btn>
            </v-toolbar>
          </template>
          <template v-slot:[`item.pdfFilePath`]="{ item, index }">
            <v-row class="align-center">
              <v-icon v-if="!item.pdfFilePath" small @click="triggerFileInput(index)">mdi-upload</v-icon>
              <v-file-input
                v-if="!item.pdfFilePath"
                :id="'fileInput' + index"
                v-model="item.file"
                label="Subir"
                prepend-icon="mdi-upload"
                :show-size="true"
                accept=".pdf,.jpg,.png,.docx,.xlsx"
                @change="onFileChange(item)"
                hide-details
                style="display: none;"
              ></v-file-input>
              <v-chip v-if="item.pdfFilePath" color="primary" text-color="white" class="ma-2" small>
                <v-icon left>mdi-file</v-icon>
                {{ truncateFilePath(item.pdfFilePath) }}
                <v-icon right @click="removeFile(item)">mdi-close</v-icon>
              </v-chip>
            </v-row>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="$emit('editUser', item)">mdi-pencil</v-icon>
            <v-icon small @click="$emit('deleteUser', item.id)">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import { useUserStore } from '@/stores/userStore';
  import { computed, ref } from 'vue';
  
  export default {
    props: {
      users: {
        type: Array,
        required: true
      }
    },
    setup() {
      const userStore = useUserStore();
      const search = ref('');
      const filteredUsers = computed(() => {
        return userStore.users.filter(user =>
          user.name.toLowerCase().includes(search.value.toLowerCase()) ||
          user.email.toLowerCase().includes(search.value.toLowerCase())
        );
      });
  
      const { triggerFileInput, removeFile } = userStore;
  
      return {
        search,
        filteredUsers,
        triggerFileInput,
        removeFile
      };
    },
    data() {
      return {
        headers: [
          { key: 'name', title: 'Nombre' },
          { key: 'email', title: 'Correo Electrónico' },
          { key: 'pdfFilePath', title: 'Archivo' },
          { key: 'actions', title: 'Acciones' },
        ]
      };
    },
    methods: {
      onFileChange(item) {
        this.$emit('fileChanged', item);
      },
      truncateFilePath(filePath) {
        if (filePath.length > 20) {
          return filePath.substring(0, 20) + '...';
        }
        return filePath;
      }
    }
  };
  </script>
  
  <style>
  .v-file-input {
    display: none;
  }
  
  .v-chip {
    display: flex;
    align-items: center;
  }
  
  .v-chip v-icon {
    cursor: pointer;
  }
  </style>
  