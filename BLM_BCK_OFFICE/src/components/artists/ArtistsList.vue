<template>
  <GenericTable
    :useQueryFn="useArtists"
    :columns="artistColumns"
    :onDeleteSelected="handleDeleteSelected"
  />
</template>

<script setup lang="ts">
import { useArtists, useDeleteArtists } from "@/services/queries/useArtists";
import GenericTable from "@components/GenericTable.vue";
import { columns as artistColumns } from "@/components/artists/columns";
const { mutate: deleteArtists } = useDeleteArtists();
const handleDeleteSelected = (ids: string[]) => {
  
  deleteArtists(ids);
}
</script>

<style scoped></style>
