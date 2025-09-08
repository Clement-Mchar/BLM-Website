<script setup lang="ts">
import { useRoute } from "vue-router";
import HeaderPicture from "../components/HeaderPicture.vue";
import ItemsBody from "../components/ItemsBody.vue";
import { usePost } from "@blm/shared";
const route = useRoute();
const postId = route.params.id as string;
const { data: post } = usePost(postId);
</script>

<template>
	<div class="bg-background-100">
		<HeaderPicture
			v-if="post"
			:title="post.title.toLocaleUpperCase()"
			:picture="post.header?.url"
			class="h-[39em]"
		/>
				<div class="flex w-full min-w-96 mt-8 justify-center overflow-hidden object-contain">
			<ItemsBody
				v-if="post"
				:body="post.body"
				class="w-full bg-[#182545] mx-80"
			/>
		</div>
	</div>
</template>

<style scoped></style>
