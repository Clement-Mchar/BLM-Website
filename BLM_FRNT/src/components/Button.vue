<template>
	<button
		:type="type"
		:class="class"
		@click="$emit('action')"
	>
		{{ text }}
	</button>
</template>

<script setup lang="ts">

defineProps({
	text: {
		type: String,
		required: true,
	},
	type: {
		type: String as () => "button" | "submit" | "reset",
		default: "button",
	},
	class: {
		type: String,
		required: false
	}
});
defineEmits(["action"])
</script>

<style></style>
