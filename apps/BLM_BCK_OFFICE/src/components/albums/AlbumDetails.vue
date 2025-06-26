<template>
  <div class="flex flex-col w-full">
    <ItemDetailOptions :onDelete="onDelete" :editLink="{ name: 'edit-album', params: { id: albumId } }" />
    <ItemDetails v-if="album" :item="album" />
  </div>
</template>

<script setup lang="ts">
import { useAlbum, useDeleteAlbum } from "@blm/shared";
import ItemDetailOptions from "@/components/ItemDetailsOptions.vue";
import ItemDetails from "../ItemDetails.vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const albumId = String(route.params.id);
const album = useAlbum(albumId);

const { mutateAsync: deleteAlbum } = useDeleteAlbum(albumId);

async function onDelete() {
  await deleteAlbum(albumId);
  router.push({ name: "albums" });
}
</script>
<style></style>
