<template>
  <DataTableDropDown :onDelete="deletePost" :editLink="{ name: 'edit-post', params: { id: props.post.id } }" :detailsLink="{name: 'post-details', params: { id: props.post.id }}""></DataTableDropDown>
</template>

<script setup lang="ts">

import { ref } from "vue";
import { useDeletePost } from "@/services/queries/usePosts";

import DataTableDropDown from "../DataTableDropDown.vue";

const props = defineProps<{ post: { id: string } }>();

const deletePostMutation = useDeletePost(props.post.id);

const isOpen = ref(false);

const deletePost = () => {
  deletePostMutation.mutate(props.post.id, {
    onSuccess: () => {
      isOpen.value = false;
    },
  });
};
</script>
