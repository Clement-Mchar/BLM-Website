import { createRouter, createWebHistory } from "vue-router";
import authRoutes from "@/router/routes/auth-routes";
import backofficeRoutes from "@/router/routes/back-office-routes";
import { blmApi } from "@/services/api";

const routes = [...authRoutes, ...backofficeRoutes];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to) => {
  const user = await blmApi.setCurrentUser();


  if (user && to.meta.guestOnly) return { name: "back-office" };
  if (!user && !to.meta.requiresAuth) return;

  if (user) return;
  return { name: "login" };
});

export default router;
