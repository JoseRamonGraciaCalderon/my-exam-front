<template>
  <v-snackbar v-model="alertState.snackbar" :color="alertState.snackbarColor" :timeout="timeout" class="custom-snackbar">
    <v-row align="center" justify="center" class="alert-content">
      <v-icon class="alert-icon">{{ alertState.snackbarIcon }}</v-icon>
      <span>{{ alertState.snackbarMessage }}</span>
    </v-row>
    <template v-slot:actions>
      <v-btn icon class="close-btn" @click="closeSnackbar">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { useAlertService } from '@/services/alertService';

export default {
  setup() {
    const { state: alertState, closeSnackbar } = useAlertService();
    return {
      alertState,
      closeSnackbar,
      timeout: 3000, // Duración de la alerta en milisegundos
    };
  }
};
</script>

<style scoped>

</style>
