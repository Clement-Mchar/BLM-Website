<script setup lang="ts">
import Layout from "@/components/Layout.vue";
import type { SidebarProps } from "@/components/ui/sidebar";
import NavMain from "@components/NavMain.vue";
import { Sidebar, SidebarContent, SidebarRail } from "@/components/ui/sidebar";

import {
  Users,
  UserCog,
  Guitar,
  Disc3,
  MicVocal,
  PenTool,
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
      title: "Staff",
      url: "#",
      icon: UserCog,
      items: [
        {
          title: "All Staff Members",
          url: "#",
        },
        {
          title: "Create Staff Member",
          url: "#",
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
      title: "Events",
      url: "#",
      icon: MicVocal,
      items: [
        {
          title: "All Events",
          url: "#",
        },
        {
          title: "Create Event",
          url: "#",
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
          url: "#",
        },
        {
          title: "Create Post",
          url: "#",
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
