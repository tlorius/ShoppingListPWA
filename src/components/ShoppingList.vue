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
        <v-card class="pl-2 text-center">
            <v-row align="center">
                <v-col>Completed</v-col>
                <v-col>Item Name</v-col>
                <v-col>Amount</v-col>
                <v-col>Due Date</v-col>
                <v-col>Edit</v-col>
                <v-col>Delete</v-col>
            </v-row>
        </v-card>
        <ShoppingListItem v-for="item in filterByCompletion()" :key="item.id" :item="item"/>
    </v-container>
</template>