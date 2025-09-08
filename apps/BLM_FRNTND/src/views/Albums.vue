<script setup lang="ts">
import { useAlbums } from "@blm/shared";
const { data: albums } = useAlbums();
</script>
<template>
	<div
		class="flex flex-col w-96 lg:w-[64rem] md:w-[48rem] lg:overflow-hidden lg:justify-items-start xl:w-[70em] mx-auto mt-12 justify-center items-center object-contain"
	>
		<ItemsLayout>
			<template #title>Releases</template>
			<Card
				v-if="albums"
				v-for="album in albums"
				:key="album.id"
				:name="album.name.toLocaleUpperCase()"
				:picture="album.cover?.url"
				:albumLink="album.link"
			/>
		</ItemsLayout>
	</div>
</template>

<style scoped></style>
