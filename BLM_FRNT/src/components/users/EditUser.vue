<script setup lang="ts">
import EditableField from "../ui/editable/EditableField.vue";
import { useRoute, useRouter } from "vue-router";
import { useUpdateUser, useUser } from "@/services/queries/useUsers";

const route = useRoute();
const userId = Number(route.params.id);
const router = useRouter();
const { data: user, isLoading } = useUser(userId);
const updateUser = useUpdateUser();

const handleSave = (fieldName: string, value: string) => {
  const key = fieldName?.toLowerCase();
  if (!user.value) return;
  updateUser.mutate(
    {
      id: user!.value.id,
      payload: {
        [key]: value,
      },
    },
    {
      onSuccess: () => {
        console.log(user);
        router.push("/back-office/users");
      },
    },
  );
};
</script>
<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="user">
    <EditableField fieldName="Username" :default-value="user!.username" :entity-id="user!.id" @save="handleSave" />
  </div>
</template>
<style scoped></style>
