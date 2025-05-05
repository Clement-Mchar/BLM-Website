<template>
  <button v-bind="attrs" :class="cn($attrs.class ?? '')" :text="props.text" @click="$emit('action')">
    <slot>{{ props.text }}</slot>
  </button>
</template>

<script setup lang="ts">
import { useAttrs } from "vue";
import { cn } from "@/lib/utils";
const attrs = useAttrs();
const props = defineProps<{
  text?: string;
}>();
defineEmits(["action"]);
</script>

<style></style>
