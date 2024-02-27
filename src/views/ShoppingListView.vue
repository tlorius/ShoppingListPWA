<script setup>
import AddItemForm from '@/components/AddItemForm.vue';
import ShoppingListItem from '@/components/ShoppingListItem.vue';
import { useShoppingListStore } from '@/stores/shoppingListStore';

const store = useShoppingListStore()
</script>

<template>
  <div class="about">
    <h1>Shopping List rendered here</h1>
    <v-container>
        <ShoppingListItem v-for="item in store.groceries" :key="item.id" :item="item"/>
    </v-container>
    <AddItemForm />
  </div>
</template>
