<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const isVisible = ref(true);

let hideTimeout: ReturnType<typeof setTimeout> | null = null;

function handleMouseMove(e: MouseEvent) {
	if (e.clientY < 50) {
		if (hideTimeout) {
			clearTimeout(hideTimeout);
			hideTimeout = null;
		}
		isVisible.value = true;
	} else {
		if (!hideTimeout) {
			hideTimeout = setTimeout(() => {
				isVisible.value = false;
				hideTimeout = null;
			}, 700);
		}
	}
}

onMounted(() => {
	window.addEventListener("mousemove", handleMouseMove);
});

onUnmounted(() => {
	window.removeEventListener("mousemove", handleMouseMove);
});

const links = [
	{ to: "/artists", label: "Artists" },
	{ to: "/releases", label: "Releases" },
	{ to: "/news", label: "News" },
	{ to: "/spotlight", label: "Spotlight" },
	{ to: "/events", label: "Events" },
	{ to: "/videos", label: "Videos" },
	{ to: "/about", label: "About" },
];
</script>
<template>
	<header
		:class="[
			'flex fixed top-0 left-0 w-full h-70 bg-transparent  text-white transition-transform duration-1000 z-50',
			isVisible ? 'translate-y-0' : '-translate-y-full',
		]"
	>
		<div
			class="pointer-events-none absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black/80 to-transparent z-10"
		></div>
		<div class="flex w-full justify-between px-48 py-1 text-xl">
			<h1 class="text-4xl z-50">BLM</h1>
			<nav class="flex justify-between gap-x-6 bg-transparent">
				<router-link
					v-for="item in links"
					:key="item.to"
					:to="item.to"
					class="relative z-50 inline-block transition-colors duration-1000 h-9 py-1 after:content-[''] after:bg-[#00b3ff] after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:scale-x-0 after:origin-left after:transition-transform after:duration-700 hover:after:scale-x-100"
				>
					{{ item.label }}
				</router-link>
			</nav>
		</div>
	</header>
</template>
<style scoped></style>
