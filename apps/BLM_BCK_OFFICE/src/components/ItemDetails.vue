<template>
  <div class="flex flex-row w-full h-full justify-evenly">
    <div class="w-full"></div>
    <div v-if="item?.data?.value" class="w-96">
      <div v-for="key in keys" :key="key as string" class="items-center flex flex-col mb-4 w-96 border rounded-xl justify-between pb-4">
        <div class="border-b-[1px] min-w-full text-center">{{ key }}</div>

        <div v-if="isImage(item.data.value[key])">
          <img :src="item.data.value[key].url" alt="Image" class="w-32 h-32 rounded-full object-cover" />
        </div>
        <div v-else-if="isRichText(item.data.value[key])" v-html="item.data.value[key]"></div>
        <div v-else>
          {{ item.data.value[key] }}
        </div>
      </div>
    </div>
    <div class="w-full"></div>
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
function isImage(value: unknown): value is { url: string } {
  return typeof value === "object" && value !== null && "url" in value && typeof (value as any).url === "string";
}
function isRichText(value: unknown): value is string {
  return typeof value === "string" && /<\/?[a-z][\s\S]*>/i.test(value);
}
</script>
