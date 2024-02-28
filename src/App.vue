<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <v-app>
    <v-app-bar app><v-toolbar>
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title>Shopping List</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn text :class="{ 'custom-active-link': $route.path === '/' }"><RouterLink to="/">Shopping List</RouterLink></v-btn>
      <v-btn text :class="{ 'custom-active-link': $route.path === '/completed' }"><RouterLink to="/completed">Completed Items</RouterLink></v-btn>
    </v-toolbar-items>
  </v-toolbar></v-app-bar>

      
  

      <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
        <RouterView />
      </v-main>
  </v-app>
      
</template>

<style scoped>
.custom-active-link {
  background-color: var(--vt-c-divider-dark-2);
}
</style>
