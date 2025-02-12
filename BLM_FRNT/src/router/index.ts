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
	if (!to.meta.requiresAuth) return;
	const user = await blmApi.getCurrentUser();
	console.log("sex");
	if (user) return;
	if (!user) console.log("sexisex");
	return { name: "login" };
});

export default router;
