<script setup lang="ts">
import { useVideos } from "@blm/shared";
import { ref, computed } from "vue";

const { data: videos } = useVideos();
const categories = ["ALL", "CLIP", "LIVE", "OTHER"];

const activeTab = ref("ALL");

const filteredVideos = computed(() => {
	if (!videos.value) return [];
	if (activeTab.value === "ALL") return videos.value;
	return videos.value.filter(
		(video) => video.category.toUpperCase() === activeTab.value
	);
});
</script>
<template>
	<div
		class="flex flex-col w-96 lg:w-[64rem] md:w-[48rem] lg:overflow-hidden lg:justify-items-start xl:w-[70em] mx-auto mt-12 justify-center items-center object-contain"
	>
		<ItemsLayout>
			<template #title>Videos</template>
			<div class="flex space-x-4 text-accent-100">
				<button
					v-for="category in categories"
					:key="category"
					@click="activeTab = category"
					class="px-4 border rounded uppercase text-sm transition-colors"
					:class="{
						'bg-accent-100 text-background-100': activeTab === category,
						'hover:bg-accent-200': activeTab !== category,
					}"
				>
					{{ category }}
				</button>
			</div>
			<div class="flex flex-row w-full min-h-60">
				<Card
					v-if="videos"
					v-for="video in filteredVideos"
					:key="video.id"
					:name="video.title.toLocaleUpperCase()"
					:picture="video.thumbnailUrl"
					:videoLink="video.url"
				/>
			</div>
		</ItemsLayout>
	</div>
</template>

<style scoped></style>
