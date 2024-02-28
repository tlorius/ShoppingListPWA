<script setup>
import { RouterLink, RouterView } from "vue-router";
import { ref } from "vue"
import { useDisplay } from 'vuetify'
const { smAndDown } = useDisplay()
const drawer = ref(false)

</script>

<template>
  <v-app>
    
    <v-app-bar app>
      
      <v-toolbar>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title :class="{ 'text-xs': smAndDown }" >Shopping List</v-toolbar-title>
          <v-toolbar-items>
            <v-btn text :class="{ 'custom-active-link': $route.path === '/' }">
              <RouterLink :class="{ 'text-xs': smAndDown }"  to="/">Shopping List</RouterLink>
            </v-btn>
            <v-btn text :class="{ 'custom-active-link': $route.path === '/completed' }">
              <RouterLink :class="{ 'text-xs': smAndDown }" to="/completed">Completed Items</RouterLink>
            </v-btn>
          </v-toolbar-items>
      </v-toolbar>
    </v-app-bar>
    
    <v-navigation-drawer v-model="drawer">
      <v-list-item link title="Download PWA"></v-list-item>
    </v-navigation-drawer>
    
    <v-main style="min-height: 300px;">
        <RouterView :class="{ 'text-xs': smAndDown }"/>
      </v-main>
  </v-app>  
</template>

<style scoped>
.custom-active-link {
  background-color: var(--vt-c-divider-dark-2);
}
.text-xs{
  font-size: 9px;
}
</style>
