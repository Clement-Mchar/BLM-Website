import { createRouter, createWebHistory } from "vue-router";
import authRoutes from "./routes/auth";
import dashboardRoutes from "./routes/dashboard";
import { blmApi } from "../lib/api";
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
