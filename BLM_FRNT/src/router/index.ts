import { createRouter, createWebHistory } from "vue-router";
import authRoutes from "@/router/routes/auth";
import dashboardRoutes from "@/router/routes/dashboard";
import { useQueryClient } from "@tanstack/vue-query";
import { blmApi } from "@/services/api";
const routes = [...authRoutes, ...dashboardRoutes];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

router.beforeEach(async (to) => {
	const queryClient = useQueryClient();
	let user = queryClient.getQueryData(["auth"]);
	
	if (!user && !to.meta.requiresAuth) return;
	if (!user) {
		user = await blmApi.setCurrentUser();
		queryClient.setQueryData(["auth"], user);
	}
	if (user && to.meta.guestOnly) return { name: "dashboard" };
	
	if (user) return;
	return { name: "login" };
});

export default router;
