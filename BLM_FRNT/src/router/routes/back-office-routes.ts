import UsersList from "@/components/users/UsersList.vue";
import BackOffice from "~/views/BackOffice.vue";
import CreateUserForm from "@components/users/CreateUserForm.vue";
import EditUser from "@components/users/EditUser.vue";
import CreateArtistForm from "@/components/artists/CreateArtistForm.vue";
import ArtistsList from "@/components/artists/ArtistsList.vue";
import EditArtist from "@/components/artists/EditArtist.vue";
import UserDetails from "@/components/users/UserDetails.vue";
import ArtistDetails from "@/components/artists/ArtistDetails.vue";
import AlbumsList from "@/components/albums/AlbumsList.vue";
import CreateAlbumForm from "@/components/albums/CreateAlbumForm.vue";

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
        props: true,
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
        path: "users/:id",
        name: "user-details",
        component: UserDetails,
      },
      {
        path: "artists",
        name: "artists",
        component: ArtistsList,
        props: true,
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
      {
        path: "artists/:id",
        name: "artist-details",
        component: ArtistDetails,
      },
      {
        path: "albums",
        name: "albums",
        component: AlbumsList,
        props: true,
      },
      {
        path: "albums/create",
        component: CreateAlbumForm,
        props: true,
      },
    ],
    meta: { requiresAuth: true },
  },
];
