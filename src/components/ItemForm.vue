<script setup>
    import { ref, computed, watch} from "vue"
    import { useShoppingListStore } from "@/stores/shoppingListStore";
    import { v4 as uuidv4 } from 'uuid';
    import { formatDate, parseDateFormat } from "../utils/utils"
    import { compareAsc } from "date-fns";

    const store = useShoppingListStore()

    const props = defineProps({
        isUpdate: Boolean,
        itemToUpdate: {
            type: Object
        }
    })

    const itemName = ref("")
    const amount = ref(1)
    const dueDate = ref(null)
    const menu = ref(false)

    const itemNameRules = [
        value => {
            if(value.trim()) return true
            return "Field Required"
        }
    ]

    const amountRules = [
        value => {
            if(/^[0-9]+$/.test(value)) return true
            return "Please enter a number"
        }
    ]

    const formattedDueDateRules = [
        value => {
            if(!value) return true
            //only allow due date to be set to today or in the future
            if(compareAsc(parseDateFormat(value), parseDateFormat(formatDate(Date.now()))) !== -1) return true
            return "Date should be today or in the future"
        }
    ]

    const submit = async (event) => {
        //omitting a trycatch because the user already receives feedback
        //that their inputs are invalid
        const results = await event
        //results is an object with 2 props(valid(bool) and errors(arr))
        if(results.valid){
            addItemToList()
            //clearing fields after adding item
            itemName.value = ""
            amount.value = 1
            dueDate.value = null;
        }
    }

    const addItemToList = () => {
        const itemToAdd = {
            id: uuidv4(),
            name: itemName.value,
            amount: parseInt(amount.value),
            dueDate: formattedDueDate.value,
            completed: false,
        }
       
        store.addItem(itemToAdd)
    }
    //conditionally call within submit function
    const updateListItem = () => {
        const updatedItem = {
            id: store.itemToUpdate.id,
            name: itemName.value,
            amount: parseInt(amount.value),
            dueDate: formattedDueDate.value,
            completed: store.itemToUpdate.completed,
        }

        store.updateItem(updatedItem)
    }

    const handleDateSelection = () => {
        menu.value = false;
    }

    const formattedDueDate = computed(() => {
    return dueDate.value ? formatDate(dueDate.value): null;
});

    const resetDate = () => {
        dueDate.value = null;
    }

    const cancelEdit = () => {
        store.editMode = false
    }

    //note for edit submit => currently we are still working with a proxy item => map to new const
    //setting fields to empty or existing item depending on isUpdate prop
    watch(() => props.isUpdate, (newValue) => {
        if(newValue){
            itemName.value = store.itemToUpdate.name
            amount.value = store.itemToUpdate.amount
            dueDate.value = store.itemToUpdate.dueDate ? parseDateFormat(store.itemToUpdate.dueDate) : null
        } else  {
            itemName.value = ""
            amount.value = 1
            dueDate.value = null
        }
    })
    
</script>

<template>
    <v-sheet width="1000" class="mx-auto">
      <v-form fast-fail @submit.prevent="submit">
        <v-text-field
          v-model="itemName"
          label="Item Name *"
          :rules="itemNameRules"
        ></v-text-field>
  
        <v-text-field
          v-model="amount"
          label="Amount *"
          :rules="amountRules"
        ></v-text-field>

        <v-row align="center">
            <v-col>
                <v-menu
                    v-model="menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="dueDate"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                    >
                    <template v-slot:activator="{ props }">
                        <v-text-field
                         v-model="formattedDueDate"
                         label="Due Date"
                         readonly
                         v-bind="props"
                         :rules="formattedDueDateRules"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="dueDate" @update:modelValue="handleDateSelection"></v-date-picker>
                </v-menu>
            </v-col>
            <v-col>
                <v-btn @click="resetDate">Remove Due Date</v-btn>
            </v-col>
        </v-row>
        

        <v-btn v-if="!isUpdate" type="submit" block class="mt-2">Add To List</v-btn>
        <v-row v-else>
            <v-col>
                <v-btn type="submit" class="mt-2">Update Item</v-btn>
            </v-col>
            <v-col>
                <v-btn type="button" class="mt-2" @click="cancelEdit">Discard Changes</v-btn>
            </v-col>
        </v-row>
        
      </v-form>
    </v-sheet>
</template>