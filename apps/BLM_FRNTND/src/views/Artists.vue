<script setup lang="ts">
import { useArtists } from "@blm/shared";
import Card from "../components/Card.vue";
import ItemsLayout from "../components/ItemsLayout.vue";
const { data: artists } = useArtists();
</script>
<template>
	<div
		class="flex flex-col w-96 lg:w-[64rem] md:w-[48rem] lg:overflow-hidden lg:justify-items-start xl:w-[70em] mx-auto mt-12 justify-center items-center object-contain"
	>
		<ItemsLayout>
			<template #title>Artists</template>
			<Card
				v-if="artists"
				v-for="artist in artists"
				:name="artist.name.toLocaleUpperCase()"
				:picture="artist.avatar?.url"
				:artistId="artist.id"
			/>
		</ItemsLayout>
	</div>
</template>

<style scoped></style>
