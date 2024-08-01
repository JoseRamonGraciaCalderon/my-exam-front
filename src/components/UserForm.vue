<template>
    <v-dialog v-model="dialogInternal" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ edit ? 'Editar Usuario' : 'Agregar Usuario' }}</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-model="localUser.name"
              label="Nombre"
              :rules="[v => !!v || 'El nombre es requerido']"
              required
            ></v-text-field>
            <v-text-field
              v-model="localUser.email"
              label="Correo Electrónico"
              :rules="[v => !!v || 'El correo electrónico es requerido']"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
          <v-btn :disabled="!valid" color="blue darken-1" text @click="save">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    name: 'UserForm',
    props: {
      user: {
        type: Object,
        default: () => ({ name: '', email: '' })
      },
      edit: {
        type: Boolean,
        default: false
      },
      dialog: {
        type: Boolean,
        required: true
      }
    },
    data() {
      return {
        dialogInternal: this.dialog,
        localUser: { ...this.user },
        valid: false
      };
    },
    watch: {
      dialog(newVal) {
        this.dialogInternal = newVal;
      },
      dialogInternal(newVal) {
        this.$emit('update:dialog', newVal);
      },
      user: {
        immediate: true,
        deep: true,
        handler(newUser) {
          this.localUser = { ...newUser };
        }
      }
    },
    methods: {
      close() {
        this.dialogInternal = false;
        this.$emit('close');
      },
      save() {
        if (this.$refs.form.validate()) {
          this.$emit('save', this.localUser);
          this.close();
        }
      }
    }
  };
  </script>
  
  <style>
  /* Agrega los estilos necesarios */
  </style>
  