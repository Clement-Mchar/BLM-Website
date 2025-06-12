<template>
  <div class="flex flex-col w-full">
    <ItemDetailOptions :onDelete="onDelete" :editLink="{ name: 'edit-artist', params: { id: artistId } }" />
    <ItemDetails v-if="artist" :item="artist" />
  </div>
</template>

<script setup lang="ts">
import { useArtist, useDeleteArtist } from "@/services/queries/useArtists";
import ItemDetailOptions from "@/components/ItemDetailsOptions.vue";
import ItemDetails from "../ItemDetails.vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const artistId = String(route.params.id);
const artist = useArtist(artistId);

const { mutateAsync: deleteArtist } = useDeleteArtist(artistId);

async function onDelete() {
  await deleteArtist(artistId);
  router.push({ name: "artists" });
}
</script>
<style></style>
