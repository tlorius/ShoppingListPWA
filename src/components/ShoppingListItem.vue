<script setup>
    import { useShoppingListStore } from '@/stores/shoppingListStore';
    import { compareDateToToday } from "../utils/utils"
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
        store.editMode = false
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

    const enterEditMode = (item) => {
        store.itemToUpdate = item
        store.editMode = true
    }
</script>

<template>
    <v-card class="mt-5 pl-2 text-center">
        <v-row align="center">
            <v-col>
                <v-checkbox
                class="d-inline-flex" 
                :model-value="item.completed" 
                @update:model-value="() => toggleCompletion(item)"></v-checkbox>
            </v-col>

            <v-col>{{ item.name }}</v-col>

            <v-col>{{ item.amount }}</v-col>

            <v-col>
                <v-chip v-if="item.dueDate && compareDateToToday(item.dueDate) === -1"
                    density="comfortable"
                    size="large"
                    variant="flat"
                    color="red">
                        overdue
                </v-chip>
                <v-chip v-else-if="item.dueDate && compareDateToToday(item.dueDate) === 0"
                    density="comfortable"
                    size="large"
                    variant="flat"
                    color="orange">
                        due today
                </v-chip>
                <v-chip v-else-if="item.dueDate && compareDateToToday(item.dueDate) === 1"
                    density="comfortable"
                    size="large">
                        {{ item.dueDate }}
                </v-chip>
                <v-chip v-else density="comfortable" size="large">
                        not set
                </v-chip>
            </v-col>


            <v-col>
                <v-btn @click="() => enterEditMode(item)" icon>
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
            </v-col>

            <v-col>
                <v-btn @click="() => deleteItem(item.id)" icon>
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
            </v-col>
        </v-row>
  </v-card>
</template>