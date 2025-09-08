<script setup lang="ts">
import { ref } from "vue";
import AnimatedLine from "../components/AnimatedLine.vue";
import { useAlbums, useArtists, useVideos } from "@blm/shared";
import { computed } from "vue";

const isAtStart = computed(() => activeIndex.value === 0);
const isAtEnd = computed(
	() => videos?.value && activeIndex.value === videos.value.length - 1
);

const { data: albums } = useAlbums();
const { data: artists } = useArtists();
const { data: videos } = useVideos();
const latestArtists = computed(() =>
	artists?.value
		?.slice()
		?.sort(
			(a, b) =>
				new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
		)
		?.slice(0, 3)
);
const latestAlbums = computed(() =>
	albums?.value
		?.slice()
		?.sort(
			(a, b) =>
				new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
		)
		?.slice(0, 3)
);
const latestVideos = computed(() =>
	videos?.value
		?.slice()
		?.sort(
			(a, b) =>
				new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
		)
		?.slice(0, 3)
);
defineProps<{
	prevIcon?: string;
	nextIcon?: string;
}>();
const activeIndex = ref(0);

function onClickPrev() {
	activeIndex.value--;
}
function onClickNext() {
	activeIndex.value++;
}
</script>

<template>
	<div
		class="flex flex-col justify-center mx-auto mt-12 w-full lg:w-[60em] xl:w-[78em]"
	>
		<div
			class="flex flex-col flex-wrap lg:flex-nowrap items-center justify-center lg:flex-row animate-fade-in"
		>
			<div class="hidden md:flex flex-wrap xl:flex-nowrap w-full">
				<Card
					v-if="albums"
					v-for="album in latestAlbums"
					:key="album.id"
					:name="album.name.toLocaleUpperCase()"
					:picture="album.cover?.url"
					:albumLink="album.link"
				/>
			</div>
			<div
				class="flex-col mt-12 items-center mx-auto w-[20rem] flex visible md:hidden"
			>
				<UCarousel
					v-slot="{ item: album }"
					arrows
					loop
					:prev-icon="prevIcon"
					:next-icon="nextIcon"
					:items="albums"
				>
					<Card
						v-if="latestAlbums"
						:key="album.id"
						:name="album.name.toLocaleUpperCase()"
						:picture="album.cover?.url"
						:albumLink="album.link"
				/></UCarousel>
			</div>
			<div class="flex flex-row items-center lg:pt-3 mt-8 lg:mt-0">
				<router-link
					:to="{ name: 'releases' }"
					class="text-accent-100 flex gap-1.5"
				>
					<p>More</p>
					<i class="fa-solid fa-chevron-right text-accent-200 pt-1"></i
				></router-link>
			</div>
		</div>
		<AnimatedLine class="my-12 mt-12 xl:w-[78em] lg:w-[60em] md:[42em]" />
		<div class="flex flex-col items-center w-full justify-center">
			<UCarousel
				ref="carousel"
				v-slot="{ item: video }"
				arrows
				:prev-icon="prevIcon"
				:next-icon="nextIcon"
				:prev="{
					onClick: onClickPrev,
					class: [
						'absolute ring-0 bg-transparent text-accent-200 hover:ring-0 hover:border-0 hover:bg-transparent',
						isAtStart ? 'invisible' : '',
					],
					size: 'xl',
				}"
				:next="{
					onClick: onClickNext,
					class: [
						'absolute ring-0 bg-transparent text-accent-200 hover:ring-0 hover:border-0 hover:bg-transparent',
						isAtEnd ? 'invisible' : '',
					],
					size: 'xl',
				}"
				:items="latestVideos"
				class="flex animate-fade-in"
			>
				<div class="aspect-video flex mx-auto">
					<iframe
						v-if="video.url"
						:src="video.url"
						class="w-full"
						frameborder="0"
						allow="accelerometer; autoplay;"
						allowfullscreen
					/>
				</div>
			</UCarousel>
			<div class="flex flex-row items-center justify-center lg:pt-3">
				<router-link
					:to="{ name: 'videos' }"
					class="text-accent-100 flex gap-1.5 mt-10"
					><i class="fa-solid fa-chevron-left text-accent-200 pt-1"></i>
					<p>More</p>
					<i class="fa-solid fa-chevron-right text-accent-200 pt-1"></i
				></router-link>
			</div>
		</div>

		<AnimatedLine class="my-12 mt-12 xl:w-[78em] lg:w-[60em] md:[42em]" />
		<div
			class="flex flex-col flex-wrap lg:flex-nowrap items-center justify-center lg:flex-row animate-fade-in"
		>
			<div class="hidden md:flex flex-wrap xl:flex-nowrap w-full">
				<Card
					v-if="artists"
					v-for="artist in latestArtists"
					:name="artist.name.toLocaleUpperCase()"
					:picture="artist.avatar?.url"
					:artistId="artist?.id"
				/>
			</div>
			<div
				class="flex-col mt-12 items-center mx-auto w-[20rem] flex visible md:hidden"
			>
				<UCarousel
					v-slot="{ item: artist }"
					arrows
					loop
					:prev-icon="prevIcon"
					:next-icon="nextIcon"
					:items="artists"
				>
					<Card
						v-if="latestArtists"
						:name="artist.name.toLocaleUpperCase()"
						:picture="artist.avatar?.url"
						:artistId="artist?.id"
				/></UCarousel>
			</div>
			<div class="flex flex-row items-center">
				<router-link
					:to="{ name: 'artists' }"
					class="text-accent-100 flex gap-1.5"
				>
					<p>More</p>
					<i class="fa-solid fa-chevron-right text-accent-200 pt-1"></i
				></router-link>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
