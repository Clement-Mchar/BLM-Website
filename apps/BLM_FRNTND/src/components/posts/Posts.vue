<script setup lang="ts">
import { useRoute } from "vue-router";
import { usePosts } from "@blm/shared";
import { computed } from "vue";
import PostCard from "./PostCard.vue";
const { data: posts } = usePosts();
const route = useRoute();
const filteredPosts = computed(() => {
	if (!posts.value) return [];
	return posts.value.filter((post) => post.category.toLocaleLowerCase() === route.params.category);
});
</script>
<template>
	<div class="mt-20 flex flex-col self-center w-full justify-center">
		<div
			v-for="post in filteredPosts"
			class="flex self-center justify-center w-full"
		>
			<router-link
				class="w-full flex justify-center"
				:to="{ name: 'post', params: { category: post.category.toLocaleLowerCase(), id: post.id } }"
			>
				<PostCard :post="post" />
			</router-link>
		</div>
	</div>
</template>
<style scoped></style>
