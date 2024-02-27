<script setup>
import AddItemForm from '@/components/AddItemForm.vue';
import ShoppingList from '@/components/ShoppingList.vue';

</script>

<template>
    <v-container>
        <AddItemForm />
        <ShoppingList isCompleted />
    </v-container>
    
</template>