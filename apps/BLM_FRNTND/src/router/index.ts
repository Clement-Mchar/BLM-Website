import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: () => import("../views/Home.vue"),
		},
		{
			path: "/events",
			name: "events",
			component: () => import("../views/Events.vue"),
		},

		{
			path: "/releases",
			name: "releases",
			component: () => import("../views/Albums.vue"),
			props: true,
		},

		{
			path: "/videos",
			name: "videos",
			component: () => import("../views/Videos.vue"),
			props: true,
		},
		{
			path: "/artists",
			name: "artists",
			component: () => import("../views/Artists.vue"),
			props: true,
		},
		{
			path: "/artists/:id",
			name: "artist",
			component: () => import("../views/ArtistDetails.vue"),
			props: true,
		},
	],
});

export default router;
