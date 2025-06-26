<template>
  <DataTableDropDown :onDelete="deleteAlbum" :editLink="{ name: 'edit-album', params: { id: props.album.id } }" :detailsLink="{name: 'album-details', params: { id: props.album.id }}""></DataTableDropDown>
</template>

<script setup lang="ts">

import { ref } from "vue";
import { useDeleteAlbum } from "@blm/shared";

import DataTableDropDown from "../DataTableDropDown.vue";

const props = defineProps<{ album: { id: string } }>();

const deleteAlbumMutation = useDeleteAlbum(props.album.id);

const isOpen = ref(false);

const deleteAlbum = () => {
  deleteAlbumMutation.mutate(props.album.id, {
    onSuccess: () => {
      isOpen.value = false;
    },
  });
};
</script>
