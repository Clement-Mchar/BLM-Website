<template>
	<Layout>
		<CsrfHandler />
		<Navbar />
		<div class="flex justify-between flex-col items-center h-screen relative overflow-hidden">
            <div></div>
			<SidebarProvider>
				<AppSidebar class="text-white" />
                <main>
                    <SidebarTrigger />
                </main>
			</SidebarProvider>
			<div></div>
		</div>
	</Layout>
</template>

<script setup lang="ts">
import Layout from "@components/Layout.vue";
import CsrfHandler from "@components/CsrfHandler.vue";
import Navbar from "@components/Navbar.vue";
import AppSidebar from "@/components/AppSidebar.vue";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
</script>

<style scoped></style>
