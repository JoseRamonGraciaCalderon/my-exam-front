import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import { createPinia } from 'pinia';

// Carga las fuentes
loadFonts();

// Crea una instancia de Pinia
const pinia = createPinia();

// Crea y monta la aplicación
createApp(App)
  .use(vuetify) // Usa Vuetify
  .use(pinia)   // Usa Pinia
  .mount('#app'); // Monta la aplicación en el elemento con id 'app'
