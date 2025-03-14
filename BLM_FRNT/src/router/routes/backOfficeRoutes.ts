import BackOffice from "~/views/BackOffice.vue";

export default [
  {
    path: "/back-office",
    name: "back-office",
    component: BackOffice,
    /*children: [{
			path: ':entity',
			component: EntityMenu,
			props: true,
		}],*/
    meta: { requiresAuth: true },
  },
];
