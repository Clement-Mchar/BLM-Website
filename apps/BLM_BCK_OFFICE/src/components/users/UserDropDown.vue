<template>
  <DataTableDropDown :onDelete="deleteUser" :editLink="{ name: 'edit-user', params: { id: props.user.id }}" :detailsLink="{name: 'user-details', params: { id: props.user.id }}"></DataTableDropDown>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useDeleteUser } from "@blm/shared";
import DataTableDropDown from "../DataTableDropDown.vue";

const props = defineProps<{ user: { id: number } }>();

const deleteUserMutation = useDeleteUser(props.user.id);

const isOpen = ref(false);

const deleteUser = () => {
  deleteUserMutation.mutate(props.user.id, {
    onSuccess: () => {
      isOpen.value = false;
    },
  });
};
</script>
