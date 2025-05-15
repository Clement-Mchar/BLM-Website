import UsersList from "@/components/users/UsersList.vue"
import BackOffice from "~/views/BackOffice.vue";
import CreateUserForm from "@components/users/CreateUserForm.vue";
import EditUser from "@components/users/EditUser.vue"
import CreateArtistForm from "@/components/artists/CreateArtistForm.vue";
import ArtistsList from "@/components/artists/ArtistsList.vue";
import EditArtist from "@/components/artists/EditArtist.vue";

export default [
  {
    path: "/back-office",
    name: "back-office",
    component: BackOffice,
    children: [
      {
        path: "users",
        name: "users",
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
      },
      {
        path: "artists",
        name: "artists",
        component: ArtistsList,
        props: true
      },
      {
        path: "artists/create",
        component: CreateArtistForm,
        props: true,
      },
            {
        path: "artists/:id/edit",
        name: "edit-artist",
        component: EditArtist,
      },
    ],
    meta: { requiresAuth: true },
  },
];
