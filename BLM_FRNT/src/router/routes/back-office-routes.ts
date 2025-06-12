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
import AlbumDetails from "@/components/albums/AlbumDetails.vue";
import EditAlbum from "@/components/albums/EditAlbum.vue";
import PostsList from "@/components/posts/PostsList.vue";
import CreatePostForm from "@/components/posts/CreatePostForm.vue";
import PostDetails from "@/components/posts/PostDetails.vue";
import EditPost from "@/components/posts/EditPost.vue";
import EventsList from "@/components/events/EventsList.vue";
import EventDetails from "@/components/events/EventDetails.vue";
import CreateEventForm from "@/components/events/CreateEventForm.vue";
import EditEvent from "@/components/events/EditEvent.vue";
import VideoDetails from "@/components/videos/VideoDetails.vue";
import CreateVideoForm from "@/components/videos/CreateVideoForm.vue";
import VideosList from "@/components/videos/VideosList.vue";
import EditVideo from "@/components/videos/EditVideo.vue";

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
      {
        path: "albums/:id",
        name: "album-details",
        component: AlbumDetails,
      },
      {
        path: "albums/:id/edit",
        name: "edit-album",
        component: EditAlbum,
      },
      {
        path: "posts",
        name: "posts",
        component: PostsList,
        props: true,
      },
      {
        path: "posts/create",
        component: CreatePostForm,
        props: true,
      },
      {
        path: "posts/:id",
        name: "post-details",
        component: PostDetails,
      },
      {
        path: "posts/:id/edit",
        name: "edit-post",
        component: EditPost,
      },
      {
        path: "events",
        name: "events",
        component: EventsList,
        props: true,
      },
      {
        path: "events/create",
        component: CreateEventForm,
        props: true,
      },
      {
        path: "events/:id",
        name: "event-details",
        component: EventDetails,
      },
      {
        path: "events/:id/edit",
        name: "edit-event",
        component: EditEvent,
      },
      {
        path: "videos",
        name: "videos",
        component: VideosList,
        props: true,
      },
      {
        path: "videos/create",
        component: CreateVideoForm,
        props: true,
      },
      {
        path: "videos/:id",
        name: "video-details",
        component: VideoDetails,
      },
      {
        path: "videos/:id/edit",
        name: "edit-video",
        component: EditVideo,
      },
    ],
    meta: { requiresAuth: true },
  },
];
