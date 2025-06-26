<template>
  <div class="flex flex-col w-full">
    <ItemDetailOptions :onDelete="onDelete" :editLink="{ name: 'edit-event', params: { id: eventId } }" />
    <ItemDetails v-if="event" :item="event" />
  </div>
</template>

<script setup lang="ts">
import { useEvent, useDeleteEvent } from "@blm/shared";
import ItemDetailOptions from "@/components/ItemDetailsOptions.vue";
import ItemDetails from "../ItemDetails.vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const eventId = String(route.params.id);
const event = useEvent(eventId);

const { mutateAsync: deleteEvent } = useDeleteEvent(eventId);

async function onDelete() {
  await deleteEvent(eventId);
  router.push({ name: "events" });
}
</script>
<style></style>
