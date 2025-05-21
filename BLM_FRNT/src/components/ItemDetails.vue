<template>
  <div v-if="item?.data?.value" class="flex w-full flex-row justify-evenly">
    <div v-for="key in keys" :key="key as string" class="flex flex-col mb-4 min-w-full">
      <div>{{ key }}</div>
      <div>{{ item.data.value[key] }}</div>
    </div>
  </div>
</template>
<script setup lang="ts" generic="TData, TQueryFnData">
import type { UseQueryReturnType } from "@tanstack/vue-query";
import { computed } from "vue";
const props = defineProps<{
  item: UseQueryReturnType<TData, TQueryFnData>;
}>();
const keys = computed(() => {
  const data = props.item.data.value;
  return data ? (Object.keys(data) as (keyof TData)[]) : [];
});
</script>
