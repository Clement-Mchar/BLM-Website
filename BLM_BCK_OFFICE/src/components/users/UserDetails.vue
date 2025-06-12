<template>
  <div class="flex flex-col w-full">
    <ItemDetailOptions :onDelete="onDelete" :editLink="{ name: 'edit-user', params: { id: userId } }" />
    <ItemDetails v-if="user" :item="user" />
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
