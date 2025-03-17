<script setup lang="ts">
import { columns } from '@/components/users/columns'
import DataTable from '@components/DataTable.vue'
import { useUsers } from '@/services/queries/useUsers';

const { data: fetchedData, isLoading, isError, error } = useUsers();
</script>

<template>
  <div class="container py-10 mx-auto">
    <div v-if="isLoading" class="text-center">Loading...</div>
    <div v-if="isError" class="text-center text-red-500">
      Error: {{ error?.message }}
    </div>
    <DataTable :columns="columns" :data="fetchedData ?? []" />
  </div>
</template>