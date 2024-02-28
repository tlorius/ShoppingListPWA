<script setup>
    import { useShoppingListStore } from '@/stores/shoppingListStore';
    import { compareDateToToday } from "../utils/utils"
    const store = useShoppingListStore()
    import { useDisplay } from 'vuetify'
    const { smAndDown } = useDisplay()

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
            <v-col :class="smAndDown && 'ml-0 mr-0'">
                <v-checkbox
                class="d-inline-flex"
                :class="smAndDown && 'scaleCheck'"
                :model-value="item.completed" 
                @update:model-value="() => toggleCompletion(item)"></v-checkbox>
            </v-col>

            <v-col :class="smAndDown && 'ml-0 mr-0'">{{ item.name }}</v-col>

            <v-col :class="smAndDown && 'ml-0 mr-0'">{{ item.amount }}</v-col>

            <v-col :class="smAndDown && 'ml-0 mr-0'">
                <v-chip v-if="item.dueDate && compareDateToToday(item.dueDate) === -1"
                    density="comfortable"
                    variant="flat"
                    :size="smAndDown ? 'x-small' : 'large'"
                    color="red">
                        overdue
                </v-chip>
                <v-chip v-else-if="item.dueDate && compareDateToToday(item.dueDate) === 0"
                    density="comfortable"
                    variant="flat"
                    :size="smAndDown ? 'x-small' : 'large'"
                    color="orange">
                        due today
                </v-chip>
                <v-chip v-else-if="item.dueDate && compareDateToToday(item.dueDate) === 1"
                    density="comfortable"
                    :size="smAndDown ? 'x-small' : 'large'"
                   >
                        {{ item.dueDate }}
                </v-chip>
                <v-chip v-else density="comfortable" :size="smAndDown ? 'x-small' : 'large'">
                        not set
                </v-chip>
            </v-col>


            <v-col :class="smAndDown && 'ml-0 mr-0'">
                <v-btn density="compact" :size="smAndDown ? 'small' : 'large'" @click="() => enterEditMode(item)" icon>
                    <v-icon :size="smAndDown ? 'small' : 'default'">mdi-pencil</v-icon>
                </v-btn>
            </v-col>

            <v-col :class="smAndDown && 'ml-0 mr-0'">
                <v-btn density="compact" :size="smAndDown ? 'small' : 'large'" @click="() => deleteItem(item.id)" icon>
                    <v-icon :size="smAndDown ? 'small' : 'default'">mdi-delete</v-icon>
                </v-btn>
            </v-col>
        </v-row>
  </v-card>
</template>

<style scoped>
.scaleCheck{
    transform: scale(0.5)
}
</style>