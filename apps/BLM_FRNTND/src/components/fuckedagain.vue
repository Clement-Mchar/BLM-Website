<script setup lang="ts">
import { computed } from "vue";
import { usePosts } from "@blm/shared";

const { data: posts, isLoading, error } = usePosts();

const lastPost = computed(() => {
	if (!posts.value || posts.value.length === 0) return null;
	return posts.value[posts.value.length - 1];
});
</script>
<template>
  
	<section v-if="isLoading">Chargement du dernier post…</section>

	<section
		v-else-if="lastPost"
		class="absolute flex flex-col justify-end top-0 z-40 bg-[#071222] w-full h-[50em] bg-no-repeat bg-contain bg-center"
		:style="`background-image: url(${lastPost.header?.url})`"
	>
		<h2 class="px-48 text-4xl text-left text-white py-12">{{ lastPost.title }}</h2>

		<div
			class="pointer-events-none absolute bottom-0 left-0 w-full h-20 bg-linear-to-t from-black/80 to-transparent z-20"
		></div>
	</section>
	<section v-else>Aucun post disponible.</section>
</template>
<style scoped></style>
