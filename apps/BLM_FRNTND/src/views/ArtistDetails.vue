<script setup lang="ts">
import { useRoute } from "vue-router";
import ArtistName from "../components/ArtistName.vue";
import ArtistBody from "../components/ArtistBody.vue";
import { useArtist } from "@blm/shared";
import { computed } from "vue";
const route = useRoute();
const artistId = route.params.id as string;
const { data: artist } = useArtist(artistId);
const albums = computed(() => artist.value?.albums || []);
const videos = computed(() => artist.value?.videos || []);

defineProps<{
	prevIcon?: string;
	nextIcon?: string;
}>();
</script>
<template>
	<div
		class="flex flex-col w-96 lg:w-[60rem] md:w-[48rem] lg:overflow-hidden lg:justify-items-start xl:w-[70em] mx-auto mt-12 justify-center items-center object-contain"
	>
		<ArtistName
			v-if="artist"
			:name="artist.name.toLocaleUpperCase()"
			class="flex w-full justify-center items-center"
		/>
		<div class="flex w-full mx-auto my-8 lg:object-contain">
			<ArtistBody
				v-if="artist"
				:bio="artist.bio"
				:picture="artist.avatar?.url"
				:name="artist.name"
				class="text-accent-100"
			/>
		</div>
		<ItemsLayout>
			<template #title>Releases</template>
			<Card
				v-if="albums"
				v-for="album in albums"
				:key="album.id"
				:name="album.name.toLocaleUpperCase()"
				:picture="album.cover?.url"
				:albumLink="album.link"
				class="hidden md:flex"
			/>
			<UCarousel
				v-slot="{ item: album }"
				arrows
				loop
				:prev-icon="prevIcon"
				:next-icon="nextIcon"
				:items="albums"
				class="flex visible md:hidden"
			>
				<Card
					v-if="albums"
					:key="album.id"
					:name="album.name.toLocaleUpperCase()"
					:picture="album.cover?.url"
					:albumLink="album.link"
			/></UCarousel>
		</ItemsLayout>
		<div
			v-if="videos.length > 0"
			class="flex flex-col mx-auto items-center w-full justify-center"
		>
			<ItemsLayout class="w-full">
				<template #title>Videos</template>
				<UCarousel
					v-if="videos.length > 0"
					v-slot="{ item: video }"
					arrows
					loop
					:prev-icon="prevIcon"
					:next-icon="nextIcon"
					:items="videos"
					class="flex animate-fade-in"
				>
					<div class="aspect-video justify-center flex mx-auto">
						<iframe
							v-if="video.url"
							:src="video.url"
							class="w-full"
							frameborder="0"
							allow="accelerometer; autoplay;"
							allowfullscreen
						/></div
				></UCarousel>
			</ItemsLayout>
		</div>
	</div>
</template>
