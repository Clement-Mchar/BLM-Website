<template>
  <div class="flex flex-col w-full">
    <ItemDetailOptions :onDelete="onDelete" :editLink="{ name: 'edit-video', params: { id: videoId } }" />
    <ItemDetails v-if="video" :item="video" />
  </div>
</template>

<script setup lang="ts">
import { useVideo, useDeleteVideo } from "@/services/queries/useVideos";
import ItemDetailOptions from "@/components/ItemDetailsOptions.vue";
import ItemDetails from "../ItemDetails.vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const videoId = String(route.params.id);
const video = useVideo(videoId);

const { mutateAsync: deleteVideo } = useDeleteVideo(videoId);

async function onDelete() {
  await deleteVideo(videoId);
  router.push({ name: "videos" });
}
</script>
<style></style>
