import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/ShoppingListView.vue"),
    },
    {
      path: "/completed",
      name: "completed",
      component: () => import("../views/CompletedListView.vue"),
    },
  ],
});

export default router;
