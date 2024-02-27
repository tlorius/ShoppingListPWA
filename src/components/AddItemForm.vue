<script setup>
    import {ref} from "vue"
    import { useShoppingListStore } from "@/stores/shoppingListStore";
    import { v4 as uuidv4 } from 'uuid';

    const store = useShoppingListStore()
    const newItem = {   
                        id: 1, 
                        name: "PlaceholderName", 
                        amount: 1, 
                        dueDate: null, 
                        completed: false, 
                    }

    const itemName = ref("")
    const amount = ref(1)

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

    const submit = async (event) => {
        //omitting a trycatch because the user already receives feedback
        //that their inputs are invalid
        const results = await event
        //results is an object with 2 props(valid(bool) and errors(arr))
        if(results.valid){
            addItemToList()
            //add item here and navigate to home or clear the fields if we want to allow more
            itemName.value = ""
            amount.value = 1
        }
    }

    const addItemToList = () => {
        const itemToAdd = {
            id: uuidv4(),
            name: itemName.value,
            amount: parseInt(amount.value),
            dueDate: null,
            completed: false,
        }
       
        store.addItem(itemToAdd)
    }
</script>

<template>
    <v-sheet width="300" class="mx-auto">
      <v-form fast-fail @submit.prevent="submit">
        <v-text-field
          v-model="itemName"
          label="Item Name"
          :rules="itemNameRules"
        ></v-text-field>
  
        <v-text-field
          v-model="amount"
          label="Amount"
          :rules="amountRules"
        ></v-text-field>
  
        <v-btn type="submit" block class="mt-2">Add To List</v-btn>
      </v-form>
    </v-sheet>
</template>

