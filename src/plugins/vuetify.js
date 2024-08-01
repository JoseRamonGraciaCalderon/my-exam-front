// src/plugins/vuetify.js
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css'; // Importa los iconos de Material Design

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi', // Configura el conjunto de iconos predeterminado
  },
});
