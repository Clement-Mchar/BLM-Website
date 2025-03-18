<template>
  <Layout>
    <CsrfHandler />
    <Navbar />
    <div
      class="flex justify-between flex-row items-center h-screen relative overflow-hidden"
    >
      <SidebarProvider>
        <AppSidebar class="text-white" />
        <main>
          <SidebarTrigger />
        </main>
      </SidebarProvider>
      <div class="h-full w-full">
        <GenericTable
          v-if="isUsersPage"
          :useQueryFn="useUsers"
          :columns="userColumns"
        />
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import Layout from "@components/Layout.vue";
import CsrfHandler from "@components/CsrfHandler.vue";
import Navbar from "@components/NavHeader.vue";
import AppSidebar from "@/components/AppSidebar.vue";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useRoute } from "vue-router";
import { useUsers } from "@/services/queries/useUsers";
import GenericTable from "@components/users/GenericTable.vue";
import { columns as userColumns } from "@/components/users/columns";
import { computed } from "vue";
const route = useRoute();
const isUsersPage = computed(() => route.path.includes("users"));
</script>

<style scoped></style>
