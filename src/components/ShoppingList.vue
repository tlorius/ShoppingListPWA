<script setup>
    import ShoppingListItem from '@/components/ShoppingListItem.vue';
    import { useShoppingListStore } from '@/stores/shoppingListStore';

    const props = defineProps({
        isCompleted: Boolean
    })

    const store = useShoppingListStore();
    
    const filterByCompletion = () => {
        return store.groceries.filter(item => item.completed === props.isCompleted)
    }
    
</script>

<template>
    <v-container>
        <ShoppingListItem v-for="item in filterByCompletion()" :key="item.id" :item="item"/>
    </v-container>
</template>