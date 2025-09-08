<script setup lang="ts">
import type { HTMLAttributes } from "vue";
const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>
<template>
	<div :class="['relative h-[2px] mt-2 w-full ', props.class]">
		<div
			class="absolute left-1/2 top-0 h-full bg-accent-200 animate-line-expand "
		></div>
	</div>
</template>

<style scoped>
@keyframes line-expand {
	from {
		width: 0%;
		transform: translateX(-50%);
	}
	to {
		width: 100%;
		transform: translateX(-50%);
	}
}

.animate-line-expand {
	animation: line-expand 1.5s ease-out forwards;
	animation-delay: 1s;
}
</style>
