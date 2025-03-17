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
      <div class="h-full w-full"><UsersTable v-if="isUsersPage" /></div>
      
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
import UsersTable from "@components/users/UsersTable.vue";
const route = useRoute();
const isUsersPage = route.path.includes("users");
</script>

<style scoped></style>
