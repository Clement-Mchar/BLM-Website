<template>
  <GenericTable
    :useQueryFn="usePosts"
    :columns="postColumns"
    :onDeleteSelected="handleDeleteSelected"
  />
</template>

<script setup lang="ts">
import { usePosts, useDeletePosts } from "@/services/queries/usePosts";
import GenericTable from "@components/GenericTable.vue";
import { columns as postColumns } from "@/components/posts/columns";
const { mutate: deletePosts } = useDeletePosts();
const handleDeleteSelected = (ids: string[]) => {
  
  deletePosts(ids);
}
</script>

<style scoped></style>
