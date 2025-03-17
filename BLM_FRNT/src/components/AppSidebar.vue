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
          url: "#",
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
          url: "#",
        },
        {
          title: "Create Artist",
          url: "#",
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
          url: "#",
        },
        {
          title: "Create Album",
          url: "#",
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
