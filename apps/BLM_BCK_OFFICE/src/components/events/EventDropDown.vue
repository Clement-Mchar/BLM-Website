<template>
  <DataTableDropDown :onDelete="deleteEvent" :editLink="{ name: 'edit-event', params: { id: props.event.id } }" :detailsLink="{name: 'event-details', params: { id: props.event.id }}""></DataTableDropDown>
</template>

<script setup lang="ts">

import { ref } from "vue";
import { useDeleteEvent } from "@/services/queries/useEvents";

import DataTableDropDown from "../DataTableDropDown.vue";

const props = defineProps<{ event: { id: string } }>();

const deleteEventMutation = useDeleteEvent(props.event.id);

const isOpen = ref(false);

const deleteEvent = () => {
  deleteEventMutation.mutate(props.event.id, {
    onSuccess: () => {
      isOpen.value = false;
    },
  });
};
</script>
