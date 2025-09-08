<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import AnimatedLine from "./AnimatedLine.vue";
const props = defineProps<{
	name: string;
	picture?: string;
	class?: HTMLAttributes["class"];
}>();
</script>
<template>
	<div class="flex flex-col items-center md:items-start w-full object-contain">
		<h1
			class="md:text-[10em] text-[5em] text-accent-100 z-40 font-bold lg:text-left text-center"
		>
			{{ props.name }}
		</h1>
		<AnimatedLine class="xl:w-[70em] lg:w-full md:w-[48rem] sm:w-[24em]"/>
	</div>
</template>
<style></style>
