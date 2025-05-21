<template>
  <div class="flex w-full flex-row justify-evenly">
    <div class="w-full"></div>
    <ItemDetails v-if="user" :item="user" class="flex flex-col mb-4 min-w-full" />
    <ItemDetailOptions :onDelete="onDelete" :editLink="{ name: 'edit-user', params: { id: userId } }" />
  </div>
</template>

<script setup lang="ts">
import { useUser, useDeleteUser } from "@/services/queries/useUsers";
import ItemDetailOptions from "@/components/ItemDetailsOptions.vue";
import ItemDetails from "../ItemDetails.vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const userId = Number(route.params.id);
const user = useUser(userId);

const { mutateAsync: deleteUser } = useDeleteUser(userId);

async function onDelete() {
  await deleteUser(userId);
  router.push({ name: "users" });
}
</script>
<style></style>
