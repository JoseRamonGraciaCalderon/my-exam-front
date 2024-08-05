<template>
  <v-app>
    <app-header></app-header>
    <v-main>
      <v-container  class="pa-6">
        <v-row>
        <v-col cols="3">
          <tree-view></tree-view>
        </v-col>
        <v-col cols="9">
        <user-view></user-view>
      </v-col>
    </v-row>
      </v-container>
    </v-main>
    <app-footer></app-footer>
  </v-app>
</template>

<script>
import AppHeader from '@/layout/Header.vue';
import AppFooter from '@/layout/Footer.vue';
import UserView from '@/components/UserView.vue';
import TreeView from '@/components/TreeView.vue';
export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    UserView,
    TreeView
  },
};
</script>
