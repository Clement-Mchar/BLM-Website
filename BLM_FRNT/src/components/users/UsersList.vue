<template>
  <GenericTable
    :useQueryFn="useUsers"
    :columns="userColumns"
  />
</template>

<script setup lang="ts">
import { useUsers } from "@/services/queries/useUsers";
import GenericTable from "@components/GenericTable.vue";
import { columns as userColumns } from "@/components/users/columns";
</script>

<style scoped></style>
