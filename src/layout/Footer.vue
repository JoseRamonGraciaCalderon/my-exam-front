<template>
    <v-footer app padless color="primary" dark>
      <v-col class="text-center white--text">
        {{ new Date().getFullYear() }} — <strong>My Exam</strong>
      </v-col>
    </v-footer>
  </template>
  
  <script>
  export default {
    name: 'AppFooter',
  };
  </script>
  