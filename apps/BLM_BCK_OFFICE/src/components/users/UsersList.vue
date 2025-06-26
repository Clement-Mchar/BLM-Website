<template>
  <GenericTable :useQueryFn="useUsers" :columns="userColumns" :onDeleteSelected="handleDeleteSelected" />
</template>

<script setup lang="ts">
import { useUsers, useDeleteUsers } from "@blm/shared";
import GenericTable from "@components/GenericTable.vue";
import { columns as userColumns } from "@/components/users/columns";
const { mutate: deleteUsers } = useDeleteUsers();
const handleDeleteSelected = (ids: number[]) => {
  deleteUsers(ids);
};
</script>

<style scoped></style>
