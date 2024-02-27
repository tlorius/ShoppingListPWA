<script setup>
    import { useShoppingListStore } from '@/stores/shoppingListStore';
    const store = useShoppingListStore()

    defineProps({
        item: {
            type: Object,
            required: true,
            default: () => ({
                id: 0,
                product: "Placeholder",
                amount: 0,
                dueDate: null,
                completed: false,
            }),
        },
    })

    const deleteItem = (id) => {
        store.removeItem(id)
    }
</script>

<template>
    <v-container fluid>
        <v-col>
            Name: {{ item.name }}
        </v-col>
        <v-col>
            Amount: {{ item.amount }}
        </v-col>
        <v-col>
            <v-checkbox color="red" label="Checkbox"></v-checkbox>
        </v-col>
        <v-col>
            <v-btn @click="() => deleteItem(item.id)" density="compact" icon="mdi-delete"></v-btn>
        </v-col>
    </v-container>
</template>