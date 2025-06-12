<template>
  <GenericTable
    :useQueryFn="useEvents"
    :columns="eventColumns"
    :onDeleteSelected="handleDeleteSelected"
  />
</template>

<script setup lang="ts">
import { useEvents, useDeleteEvents } from "@/services/queries/useEvents";
import GenericTable from "@components/GenericTable.vue";
import { columns as eventColumns } from "@/components/events/columns";
const { mutate: deleteEvents } = useDeleteEvents();
const handleDeleteSelected = (ids: string[]) => {
  
  deleteEvents(ids);
}
</script>

<style scoped></style>
