<template>
	<RouterLink :to="link" :class="`text-center content-center w-100 hover:bg-gray-700 ${customClass}`">
		<h2 class=" text-6xl">{{ text }}</h2>
	</RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
defineProps({
	link: {
		type: String,
		required: true,
	},
	customClass: {
		type: String,
        default: ''
	},
	text: {
		type: String,
		required: true,
	},
});
</script>

<style scoped></style>
