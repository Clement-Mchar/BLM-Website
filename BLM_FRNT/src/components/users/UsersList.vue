<template>
  <GenericTable :useQueryFn="useUsers" :columns="userColumns" :onDeleteSelected="handleDeleteSelected" />
</template>

<script setup lang="ts">
import { useUsers } from "@/services/queries/useUsers";
import GenericTable from "@components/GenericTable.vue";
import { columns as userColumns } from "@/components/users/columns";
import { useDeleteUsers } from "@/services/queries/useUsers";
const { mutate: deleteUsers } = useDeleteUsers();
const handleDeleteSelected = (ids: number[]) => {
  deleteUsers(ids);
};
</script>

<style scoped></style>
