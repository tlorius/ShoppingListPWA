<script setup>
    import { ref, computed} from "vue"
    import { useShoppingListStore } from "@/stores/shoppingListStore";
    import { v4 as uuidv4 } from 'uuid';
    import { formatDate, parseDateFormat } from "../utils/utils"
    import { compareAsc } from "date-fns";

    const store = useShoppingListStore()

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

    const handleDateSelection = () => {
        menu.value = false;
    }

    const formattedDueDate = computed(() => {
    return dueDate.value ? formatDate(dueDate.value): null;
});

    const resetDate = () => {
        dueDate.value = null;
    }
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
        

        <v-btn type="submit" block class="mt-2">Add To List</v-btn>
      </v-form>
    </v-sheet>
</template>

