<script setup lang="ts" generic="TData, TValue">
import type { ColumnDef } from "@tanstack/vue-table";
import DataTable from "@components/DataTable.vue";
import type { UseQueryReturnType } from "@tanstack/vue-query";
import { computed } from "vue";

const props = defineProps<{
  useQueryFn: () => UseQueryReturnType<TData, Error>;
  columns: ColumnDef<TData, TValue>[];
  onDeleteSelected?: (ids: (string | number)[]) => void;
}>();

const queryResult = computed(() => props.useQueryFn());
const { data: fetchedData, isLoading, isError, error } = queryResult.value;

const data = computed(() => fetchedData.value ?? []);
</script>

<template>
  <div class="container py-10 mx-auto flex justify-center">
    <div v-if="isLoading" class="text-center">Loading...</div>
    <div v-if="isError" class="text-center text-red-500">Error: {{ error?.message }}</div>
    <DataTable :columns="columns" :data="data" :onDeleteSelected="onDeleteSelected" />
  </div>
</template>
