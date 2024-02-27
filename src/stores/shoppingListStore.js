import { defineStore } from "pinia";

export const useShoppingListStore = defineStore("shoppingList", {
  state: () => ({
    groceries: JSON.parse(localStorage.getItem("shoppingList")) || [],
    editMode: false,
    itemToUpdate: null,
  }),
  actions: {
    addItem(item) {
      this.groceries.push(item);
      this.saveToLocalStorage();
    },
    removeItem(itemId) {
      this.groceries = this.groceries.filter((item) => item.id !== itemId);
      this.saveToLocalStorage();
    },
    updateItem(updatedItem) {
      const index = this.groceries.findIndex(
        (item) => item.id === updatedItem.id
      );
      if (index !== -1) {
        this.groceries[index] = updatedItem;
        this.saveToLocalStorage();
      }
    },
    saveToLocalStorage() {
      localStorage.setItem("shoppingList", JSON.stringify(this.groceries));
    },
  },
});
