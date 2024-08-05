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
            :rules="nameRules"
            required
          ></v-text-field>
          <v-text-field
            v-model="localUser.email"
            label="Correo Electrónico"
            :rules="emailRules"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
        <v-btn color="blue darken-1" text @click="save">Guardar</v-btn>
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
      valid: false,
      nameRules: [
        v => !!v || 'El nombre es requerido',
        v => (v && v.length >= 3) || 'El nombre debe tener al menos 3 caracteres',
        v => (v && v.length <= 30) || 'El nombre debe tener menos de 30 caracteres'
      ],
      emailRules: [
        v => !!v || 'El correo electrónico es requerido',
        v => /.+@.+\..+/.test(v) || 'El correo electrónico debe ser válido',
        v => (v && v.length <= 50) || 'El correo electrónico debe tener menos de 50 caracteres'
      ]
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
      this.$refs.form.validate();
      if (this.valid) {
        this.$emit('save', this.localUser);
        this.close();
      }
    }
  }
};
</script>

<style scoped>
/* Agrega los estilos necesarios */
</style>
