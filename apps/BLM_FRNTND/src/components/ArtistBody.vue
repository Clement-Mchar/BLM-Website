<script setup lang="ts">
import type { HTMLAttributes } from "vue";

const props = defineProps<{
	name?: string;
	picture?: string;
	class?: HTMLAttributes["class"];
	bio?: string | undefined;
}>();
</script>
<template>
	<div
		class="flex flex-col md:flex-row w-full xl:prose xl:prose-invert justify-center md:justify-between gap-4"
	>
		<div
			:class="[
				'relative flex flex-col md:flex-row items-center xl:justify-end justify-center lg:justify-between lg:w-1/2 w-full flex-wrap',
				props.class,
			]"
		>
			<img
				:src="props.picture"
				class="lg:w-[40em] lg:h-[40em] w-[24em] h-[24em] object-cover scale-x-[-1]"
				alt="Header image"
			/>
		</div>
		<div class="flex flex-col lg:w-fit w-full lg:h-96">
			<h2
				class="lg:text-right mb-4 text-accent-100 lg:text-8xl md:text-7xl sm:text-6xl text-center"
			>
				ABOUT
			</h2>

			<p
				v-html="props.bio"
				class="text-accent-100 tracking-tighter lg:text-xl md:text-sm lg:text-right text-center"
			></p>
			
		</div>
		
	</div>
</template>

<style scoped>
div >>> iframe {
	max-width: 100%;
	width: 100%;
	height: auto;
	display: block;
	margin: 0 auto;
	aspect-ratio: 16 / 9;
	padding-top: 1em;
	padding-bottom: 1em;
}
</style>
