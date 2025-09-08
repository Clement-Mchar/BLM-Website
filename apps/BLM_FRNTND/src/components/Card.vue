<script setup lang="ts">
import type { HTMLAttributes } from "vue";

const props = defineProps<{
	picture?: string;
	name: string;
	class?: HTMLAttributes["class"];
	albumLink?: string;
	artistId?: string;
	videoLink?: string;
}>();
</script>
<template>
	<div
		:class="[
			'relative flex z-30 flex-col mt-6 items-center justify-items-start hover:transform transition-colors duration-300 overflow-hidden hover:text-[#00A7F3] w-full md:w-1/3',
			props.class,
		]"
	>
		<a
			v-if="props.videoLink"
			:href="props.videoLink"
			target="_blank"
			rel="noopener noreferrer"
			class="hover:transform transition-colors duration-300 z-30"
		>
			<div class="flex overflow-hidden">
				<img
					:src="props.picture"
					class="xl:w-80 xl:h-45 md:w-60 md:h-60 h-80 w-80 object-cover"
					alt="Video thumbnail"
					loading="lazy"
				/>
			</div>
			<h3 class="text-2xl mt-2 text-accent-100">
				{{ props.name }}
			</h3>
		</a>
		<a
			v-else-if="props.albumLink"
			:href="props.albumLink"
			target="_blank"
			rel="noopener noreferrer"
			class="hover:transform transition-colors duration-300 z-30"
		>
			<div class="flex overflow-hidden">
				<img
					:src="props.picture"
					class="xl:w-80 xl:h-80 md:w-60 md:h-60 h-80 w-80 object-cover"
					alt="Card picture"
				/>
			</div>
			<h3 class="text-4xl mt-2 text-accent-100">
				{{ props.name }}
			</h3>
		</a>
		<router-link
			v-else
			:to="{ name: 'artist', params: { id: props.artistId } }"
			class="hover:transform transition-colors duration-300 z-30"
		>
			<div class="flex overflow-hidden">
				<img
					:src="props.picture"
					alt="Card picture"
					class="xl:w-80 xl:h-80 md:w-60 md:h-60 h-80 w-80 object-cover"
				/>
			</div>
			<h3 class="text-4xl mt-2 text-accent-100">
				{{ props.name }}
			</h3>
		</router-link>
	</div>
</template>
<style scoped></style>
