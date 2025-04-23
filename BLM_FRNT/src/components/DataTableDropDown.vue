<template>
  <DropdownMenu v-model:open="isOpen">
    <DropdownMenuTrigger><Settings :size="22" class="mt-2" /> </DropdownMenuTrigger>
    <DropdownMenuContent>
      <ConfirmDialog asChild title="Are you sure ?" message="This action cannot be undone" @confirm="deleteUser">
        <Button variant="destructive">Delete</Button>
      </ConfirmDialog>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <router-link :to="{ name: 'edit-user', params: { id: props.user.id } }">
          <Button variant="ghost" class="w-full justify-start">Edit</Button>
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
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/vue-query";

const props = defineProps<{ user: { id: number } }>();

const deleteUserMutation = useDeleteUser();
const queryClient = useQueryClient();
const isOpen = ref(false);

const deleteUser = () => {
  deleteUserMutation.mutate(props.user.id, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      isOpen.value = false;
    },
  });
};
</script>