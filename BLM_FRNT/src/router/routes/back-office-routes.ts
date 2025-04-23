import UsersList from "@/components/users/UsersList.vue"
import BackOffice from "~/views/BackOffice.vue";
import CreateUserForm from "@components/users/CreateUserForm.vue";
import EditUser from "@components/users/EditUser.vue"

export default [
  {
    path: "/back-office",
    name: "back-office",
    component: BackOffice,
    children: [
      {
        path: "users",
        component: UsersList,
        props: true
      },
      {
        path: "users/create",
        component: CreateUserForm,
        props: true,
      },
      {
        path: "users/:id/edit",
        name: "edit-user",
        component: EditUser,
      }
    ],
    meta: { requiresAuth: true },
  },
];
