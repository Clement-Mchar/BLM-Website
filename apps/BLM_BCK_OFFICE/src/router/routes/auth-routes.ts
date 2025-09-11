import Login from "~/views/Login.vue";

export default [
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { guestOnly: true },
  },
  {
    path: "/",
    name: "root",
    redirect: { name: "login" },
  }
];
