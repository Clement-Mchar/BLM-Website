<script setup lang="ts">
import { columns } from "@/components/users/columns";
import DataTable from "@components/DataTable.vue";
import { computed } from "vue";

const props = defineProps<{
  useQueryFn: () => any;
  columns: any;
}>();

const queryResult = computed(() => props.useQueryFn());
const { data: fetchedData, isLoading, isError, error } = queryResult.value;

const data = computed(() => fetchedData.value ?? []);
</script>

<template>
  <div class="container py-10 mx-auto flex justify-center">
    <div v-if="isLoading" class="text-center">Loading...</div>
    <div v-if="isError" class="text-center text-red-500">
      Error: {{ error?.message }}
    </div>
    <DataTable :columns="columns" :data="data" />
  </div>
</template>
