<script setup>
import ItemForm from '@/components/ItemForm.vue';
import ShoppingList from '@/components/ShoppingList.vue';
import { useShoppingListStore } from '@/stores/shoppingListStore';

const store = useShoppingListStore()
</script>

<template>
    <v-container>
        <ItemForm :isUpdate="store.editMode" :itemToUpdate="store.itemToUpdate"/>
        <ShoppingList />
    </v-container>
    
</template>
