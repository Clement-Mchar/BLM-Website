<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import Cookies from "./views/Cookies.vue";
</script>

<template>
	<UApp>
		<div class="min-h-screen flex flex-col justify-between">
			<Navbar />
			<router-view class="grow" />
			<Cookies />
			<Footer class="flex-end" />
		</div>
	</UApp>
</template>

<style scoped></style>
