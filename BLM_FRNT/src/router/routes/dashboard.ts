import Dashboard from "~/views/Dashboard.vue";



export default [
	{
		path: "/dashboard",
		name: "dashboard",
		component: Dashboard,
		/*children: [{
			path: ':entity',
			component: EntityMenu,
			props: true,
		}],*/
		meta: { requiresAuth: true },
	},
];
