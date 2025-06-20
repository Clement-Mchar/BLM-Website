<template>
  <div class="flex flex-col w-full">
    <ItemDetailOptions :onDelete="onDelete" :editLink="{ name: 'edit-post', params: { id: postId } }" />
    <ItemDetails v-if="post" :item="post" />
  </div>
</template>

<script setup lang="ts">
import { usePost, useDeletePost } from "@/services/queries/usePosts";
import ItemDetailOptions from "@/components/ItemDetailsOptions.vue";
import ItemDetails from "../ItemDetails.vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const postId = String(route.params.id);
const post = usePost(postId);

const { mutateAsync: deletePost } = useDeletePost(postId);

async function onDelete() {
  await deletePost(postId);
  router.push({ name: "posts" });
}
</script>
<style></style>
