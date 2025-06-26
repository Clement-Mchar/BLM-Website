<template>
  <GenericTable
    :useQueryFn="useAlbums"
    :columns="albumColumns"
    :onDeleteSelected="handleDeleteSelected"
  />
</template>

<script setup lang="ts">
import { useAlbums, useDeleteAlbums } from "@blm/shared";
import GenericTable from "@components/GenericTable.vue";
import { columns as albumColumns } from "@/components/albums/columns";
const { mutate: deleteAlbums } = useDeleteAlbums();
const handleDeleteSelected = (ids: string[]) => {
  
  deleteAlbums(ids);
}
</script>

<style scoped></style>
