<template>
  <GenericTable
    :useQueryFn="useVideos"
    :columns="videoColumns"
    :onDeleteSelected="handleDeleteSelected"
  />
</template>

<script setup lang="ts">
import { useVideos, useDeleteVideos } from "@blm/shared";
import GenericTable from "@components/GenericTable.vue";
import { columns as videoColumns } from "@/components/videos/columns";
const { mutate: deleteVideos } = useDeleteVideos();
const handleDeleteSelected = (ids: string[]) => {
  
  deleteVideos(ids);
}
</script>

<style scoped></style>
