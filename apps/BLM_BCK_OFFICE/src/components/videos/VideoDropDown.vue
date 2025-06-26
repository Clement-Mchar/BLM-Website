<template>
  <DataTableDropDown :onDelete="deleteVideo" :editLink="{ name: 'edit-video', params: { id: props.video.id } }" :detailsLink="{name: 'video-details', params: { id: props.video.id }}""></DataTableDropDown>
</template>

<script setup lang="ts">

import { ref } from "vue";
import { useDeleteVideo } from "@blm/shared";

import DataTableDropDown from "../DataTableDropDown.vue";

const props = defineProps<{ video: { id: string } }>();

const deleteVideoMutation = useDeleteVideo(props.video.id);

const isOpen = ref(false);

const deleteVideo = () => {
  deleteVideoMutation.mutate(props.video.id, {
    onSuccess: () => {
      isOpen.value = false;
    },
  });
};
</script>
