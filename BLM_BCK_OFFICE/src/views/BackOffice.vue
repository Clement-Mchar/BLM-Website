<template>
  <Layout>
    <CsrfHandler />
    <Navbar />
    <div
      class="flex flex-row h-full relative overflow-hidden"
    >
      <SidebarProvider>
        <AppSidebar class="text-white" />
        <main>
          <SidebarTrigger />
        </main>
      </SidebarProvider>
      <div class="h-full w-full flex justify-center">
        <router-view/>
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
</script>

<style scoped></style>
