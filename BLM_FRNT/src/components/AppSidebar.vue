<script setup lang="ts">
import Layout from "@/components/Layout.vue";
import type { SidebarProps } from "@/components/ui/sidebar";
import NavMain from "@components/NavMain.vue";
import { Sidebar, SidebarContent, SidebarRail } from "@/components/ui/sidebar";

import {
  Users,
  Guitar,
  Disc3,
  MicVocal,
  PenTool,
  Play
} from "lucide-vue-next";

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: "icon",
});

// This is sample data.
const data = {
  navMain: [
    {
      title: "Users",
      url: "#",
      icon: Users,
      isActive: true,
      items: [
        {
          title: "All Users",
          url: "/back-office/users",
        },
        {
          title: "Create User",
          url: "/back-office/users/create",
        },
      ],
    },
    {
      title: "Event",
      url: "#",
      icon: MicVocal,
      items: [
        {
          title: "All Events",
          url: "/back-office/events",
        },
        {
          title: "Create Event",
          url: "/back-office/events/create",
        },
      ],
    },
    {
      title: "Artists",
      url: "#",
      icon: Guitar,
      items: [
        {
          title: "All Artists",
          url: "/back-office/artists",
        },
        {
          title: "Create Artist",
          url: "/back-office/artists/create",
        },
      ],
    },
    {
      title: "Albums",
      url: "#",
      icon: Disc3,
      items: [
        {
          title: "All Albums",
          url: "/back-office/albums",
        },
        {
          title: "Create Album",
          url: "/back-office/albums/create",
        },
      ],
    },
    {
      title: "Posts",
      url: "#",
      icon: PenTool,
      items: [
        {
          title: "All Posts",
          url: "/back-office/posts",
        },
        {
          title: "Create Album",
          url: "/back-office/posts/create",
        },
      ],
    },
    {
      title: "Videos",
      url: "#",
      icon: Play,
      items: [
        {
          title: "All Videos",
          url: "/back-office/videos",
        },
        {
          title: "Create Video",
          url: "/back-office/videos/create",
        },
      ],
    },
  ],
};
</script>

<template>
  <Sidebar v-bind="props" class="absolute">
    <Layout>
      <SidebarContent>
        <NavMain :items="data.navMain" />
      </SidebarContent>
      <SidebarRail />
    </Layout>
  </Sidebar>
</template>
