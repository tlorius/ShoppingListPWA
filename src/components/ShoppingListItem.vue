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

    const updateItem = (updatedItem) => {
        store.updateItem(updatedItem)
    } 

    const toggleCompletion = (item) => {
        const updatedItem = {
            ...item,
            completed: !item.completed,
        }
        updateItem(updatedItem)
    }
</script>

<template>
    <v-card>
    <v-row align="center">
      <v-col>{{ item.name }}</v-col>
      <v-col>{{ item.amount }}</v-col>
      <v-col>
        <v-checkbox :model-value="item.completed" label="Completed" @update:model-value="() => toggleCompletion(item)"></v-checkbox>
      </v-col>
      <v-col>
        <v-btn @click="() => deleteItem(item.id)" icon>
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>