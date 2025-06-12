<template>
  <DataTableDropDown :onDelete="deleteArtist" :editLink="{ name: 'edit-artist', params: { id: props.artist.id } }" :detailsLink="{name: 'artist-details', params: { id: props.artist.id }}""></DataTableDropDown>
</template>

<script setup lang="ts">

import { ref } from "vue";
import { useDeleteArtist } from "@/services/queries/useArtists";

import DataTableDropDown from "../DataTableDropDown.vue";

const props = defineProps<{ artist: { id: string } }>();

const deleteArtistMutation = useDeleteArtist(props.artist.id);

const isOpen = ref(false);

const deleteArtist = () => {
  deleteArtistMutation.mutate(props.artist.id, {
    onSuccess: () => {
      isOpen.value = false;
    },
  });
};
</script>
