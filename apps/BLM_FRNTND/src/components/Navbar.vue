<script setup lang="ts">
import { onUnmounted, ref, watch } from "vue";
const links = [
	{ to: "/artists", label: "Artists" },
	{ to: "/releases", label: "Releases" },
	{ to: "/events", label: "Events" },
	{ to: "/videos", label: "Videos" },
	{ to: "/about", label: "About" },
];

const showMobileMenu = ref(false);

watch(showMobileMenu, (value) => {
	document.body.style.overflow = value ? "hidden" : "auto";
});

onUnmounted(() => {
	document.body.style.overflow = "auto";
});
</script>
<template>
	<header class="flex justify-between pl-12 lg:px-10 min-w-full">
		<router-link :to="{ name: 'home' }"
			><img
				src="https://pub-5d56e09f72d24f21a4d6bba8be518f3f.r2.dev/uploads/Logo_BLM_toudroiii.png"
				class="w-32 sm:w-40 object-contain mt-4 md:w-60 lg:w-80 min-w-32"
				alt="Logo BLM"
		/></router-link>
		<div class="navbar hidden md:flex pl-4 text-xl lg:text-2xl">
			<nav class="flex justify-between text-accent-100 mr-2">
				<router-link
					v-for="(item, index) in links"
					:key="item.to"
					:to="item.to"
					class="flex items-start pt-2 text-accent-100"
				>
					<span>{{ item.label.toUpperCase() }}</span>
					<span
						v-if="index !== links.length - 1"
						class="text-accent-200 text-8xl leading-none relative -top-[40px]"
					>
						•
					</span>
					
				</router-link>
			</nav>
		</div>

		<div class="flex px-4 z-50 md:hidden">
			<div
				v-if="showMobileMenu"
				class="fixed inset-0 bg-background-100 text-accent-100 flex flex-col items-center p-8 text-2xl"
				:class="showMobileMenu ? 'animate-fade-in' : 'animate-fade-out'"
			>
				<div class="navbar flex md:hidden gap-0 text-2xl mt-8">
					<nav class="flex flex-col justify-between gap-0 text-accent-100">
						<router-link
							v-for="(item, index) in links"
							:key="item.to"
							:to="item.to"
							class="flex flex-col items-center h-20 text-accent-100"
						>
							<span>{{ item.label.toUpperCase() }}</span>
							
							<span
								v-if="index !== links.length - 1"
								class="text-accent-200 text-9xl leading-none relative -top-[52px]"
							>
								•
							</span>
							
						</router-link>
					</nav>
				</div>
			</div>
			<button
				@click="showMobileMenu = !showMobileMenu"
				class="absolute top-2 right-4 s-50 text-accent-200 text-3xl transition-transform duration-300 md:hidden items-end"
			>
				<i
					class="fa-solid fa-bars"
					:class="
						showMobileMenu
							? 'rotate-90 duration-1000'
							: 'rotate-0 duration-1000'
					"
				></i>
			</button>
		</div>
	</header>
</template>
<style scoped></style>
