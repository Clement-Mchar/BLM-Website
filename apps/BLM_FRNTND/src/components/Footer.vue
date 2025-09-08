<script setup lang="ts">
import type { HTMLAttributes } from "vue";

const props = defineProps<{
	class?: HTMLAttributes["class"];
}>();
</script>
<template>
	<div :class="['flex flex-col w-full mt-20 py-8 bg-accent-100', props.class]">
		<p class="font-black text-lg text-background-100">NOUS CONTACTER</p>
		<div class="flex justify-center font-light gap-4">
			<a
				href="https://www.instagram.com/amplitude.blm?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
				>Instagram</a
			>
			<a href="">Facebook</a>
			<a href="">X</a>
			<a href="">Youtube</a>
			<a href="">Discord</a>
			<a href="">Mentions Légales</a>
		</div>
		<p class="font-light">© 2025 - Black Label Music Amplitude</p>
	</div>
</template>

<style scoped></style>
