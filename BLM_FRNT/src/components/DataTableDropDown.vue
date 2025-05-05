<template>
  <DropdownMenu v-model:open="isOpen">
    <DropdownMenuTrigger><Settings :size="22" class="mt-2" /> </DropdownMenuTrigger>
    <DropdownMenuContent class="flex flex-col p-0 m-0 text-center items-center">
      <div class="text-white min-w-full align-center bg-red-600 hover:bg-red-800 h-12 class= m-0 p-0">
        <ConfirmDialog asChild title="Are you sure ?" message="This action cannot be undone" @confirm="deleteUser">
          <div class="p-2 text-xl">Delete</div>
        </ConfirmDialog>
      </div>

      <DropdownMenuSeparator />
      <DropdownMenuItem asChild class="w-full p-0">
        <router-link :to="{ name: 'edit-user', params: { id: props.user.id } }">
          <Button text="Edit" type="button" class="text-xl w-full" />
        </router-link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Settings } from "lucide-vue-next";
import { ref } from "vue";
import { useDeleteUser } from "@/services/queries/useUsers";

import Button from "~/components/Button.vue";

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
