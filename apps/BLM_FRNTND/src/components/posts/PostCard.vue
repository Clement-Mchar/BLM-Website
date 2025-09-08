<script setup lang="ts" generic="TData, TError">
import type { Post } from "@blm/shared";
import { computed } from "vue";

const props = defineProps<{ post: Post }>();
function stripIframes(html: string): string {
	return html.replace(/<iframe[^>]*>.*?<\/iframe>/gi, "");
}

const cleanedBody = computed(() => stripIframes(props.post.body));
</script>
<template>
	<div class="overflow-hidden flex w-[80em] mx-20 my-4 h-80 self-center bg-gradient-to-l from-[#00274E] to-[#001935] rounded-sm">
		<img
			class="w-1/2 h-1/1 object-cover object-top"
			v-if="post?.header?.url"
			:src="post.header.url"
			alt=""
		/>
		<div class="flex flex-col w-1/2 p-4 mb-8 text-left hover:transform transition-colors duration-300">
			<p class="text-2xl m-3 mb-8 ">{{ post.title.toUpperCase() }}</p>
			<p v-html="cleanedBody" class="line-clamp-5 m-3 text-sm"></p>
		</div>
	</div>
</template>
<style></style>
