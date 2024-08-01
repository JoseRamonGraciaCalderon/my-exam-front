// src/services/alertService.js
import { reactive } from 'vue';

const state = reactive({
  snackbar: false,
  snackbarMessage: '',
  snackbarColor: '',
  snackbarIcon: ''
});

export const useAlertService = () => {
  const showSnackbar = (message, color, icon) => {
    state.snackbarMessage = message;
    state.snackbarColor = color;
    state.snackbarIcon = icon;
    state.snackbar = true;
  };

  const closeSnackbar = () => {
    state.snackbar = false;
  };

  return {
    state,
    showSnackbar,
    closeSnackbar
  };
};
