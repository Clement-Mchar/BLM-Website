<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

const props = defineProps<{
	class?: HTMLAttributes["class"];
}>();
</script>
<template>
	<div
		:class="['flex flex-col flex-wrap sm:items-center lg:items-start justify-center mx-auto  z-20 xl:w-[70em] w-full', props.class]"
	>
		<h1
			class="lg:text-left sm:justify-center font-bold text-7xl text-accent-100 translate-y-4 animate-fade-in mb-8"
		>
			<slot name="title">Default Title</slot>
		</h1>
		<AnimatedLine class=" w-full" />
		<div class="flex flex-row flex-wrap mt-8 justify-center w-full mx-auto">
			<slot />
		</div>
	</div>
</template>

<style scoped>
@keyframes fade-in {
	from {
		opacity: 0;
		transform: translateY(1rem);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

.animate-fade-in {
	animation: fade-in 0.8s ease-out forwards;
}
</style>
