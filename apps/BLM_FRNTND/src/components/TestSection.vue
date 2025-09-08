<script setup lang="ts">
import { usePosts } from "@blm/shared";
const { data: posts, isLoading } = usePosts();
import HeaderPicture from "./HeaderPicture.vue";
import { computed } from "vue";
const latestPosts = computed(() =>
	posts?.value
		?.slice()
		?.sort(
			(a, b) =>
				new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
		)
		?.slice(0, 3)
);
</script>
<template>
	<section v-if="isLoading">Chargement du dernier post…</section>

	<UCarousel
		:items="latestPosts"
		v-slot="{ item: post }"
		class="flex flex-col justify-center"
		fade
		dots
		autoplay
		:autoplay-speed="5000"
		:ui="{
			dot: 'w-3 h-3 p-0',
		}"
	>
		<ULink
			:to="{
				name: 'post',
				params: { category: post.category.toLocaleLowerCase(), id: post.id },
			}"
		>
			<HeaderPicture
				v-if="post"
				:title="post.title"
				:picture="post.header?.url"
				class="h-[43em]"
			/>
		</ULink>
	</UCarousel>
</template>

<style scoped></style>
