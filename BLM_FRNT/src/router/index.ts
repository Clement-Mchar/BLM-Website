import { createRouter, createWebHistory } from "vue-router";
import authRoutes from "@/router/routes/auth";
import dashboardRoutes from "@/router/routes/dashboard";
import { blmApi } from "@/services/api";
const routes = [...authRoutes, ...dashboardRoutes];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

router.beforeEach(async (to) => {
	const user = await blmApi.setCurrentUser();

	if (user && to.meta.guestOnly) return { name: "dashboard" };
	if (!to.meta.requiresAuth) return;
	if (user) return;
	return { name: "login" };
});

export default router;
