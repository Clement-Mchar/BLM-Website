<template>
  <div class="w-full flex flex-row justify-end">
    <div class="text-white align-center border border-solid m-2 rounded-sm h-12 class= ">
    <router-link :to="editLink">
      <div class="p-2 text-xl">Edit</div>
    </router-link>
    </div>
      <div class="text-white align-center border border-solid m-2 rounded-sm h-12 class= ">
        <ConfirmDialog asChild title="Are you sure ?" message="This action cannot be undone" :onConfirm="onDelete">
          <div class="p-2 text-xl">Delete</div>
        </ConfirmDialog>
      </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{ onDelete: () => void; editLink: object }>();
import ConfirmDialog from "@/components/ConfirmDialog.vue";
</script>
