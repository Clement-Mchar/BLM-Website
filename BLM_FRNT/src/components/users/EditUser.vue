<script setup lang="ts">
import EditableField from "../ui/editable/EditableField.vue";
import { useRoute, useRouter } from "vue-router";
import { useUpdateUser, useUser } from "@/services/queries/useUsers";
import { z } from "zod";
import { UserRole } from "../../../../BLM_BCK/app/enums";
import { useToast } from "../ui/toast";
import ToastAction from "../ui/toast/ToastAction.vue";
import { h } from "vue";
import { validateWithZod } from "@/lib/utils";

const route = useRoute();
const router = useRouter();

const userId = Number(route.params.id);

const { data: user, isLoading } = useUser(userId);
const updateUser = useUpdateUser(userId);

const username = z.string().min(3, { message: "Must be 3 or more characters long" }).max(20);
const role = z.nativeEnum(UserRole);

const handleSave = (fieldName: string, value: string) => {
  const key = fieldName?.toLowerCase();
  let validationResult;
  const { toast } = useToast();

  if (fieldName === "Username") {
    validationResult = validateWithZod(username, value);
  } else if (fieldName === "Role") {
    validationResult = validateWithZod(role, value);
  }

  if (!validationResult?.isValid) {
    toast({
      title: "Update error",
      description: `(${validationResult?.errorMessage})`,
      variant: "destructive",
      duration: 5000,
      action: h(
        ToastAction,
        {
          altText: `(${validationResult?.errorMessage})`,
        },
        {
          default: () => "Try again",
        },
      ),
    });
    return;
  }
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
        router.push("/back-office/users");
      },
    },
  );
};
</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="user" class="mt-4">
    <EditableField fieldName="Username" :schema="username" :default-value="user!.username" :entity-id="user!.id" @save="handleSave" />
    <EditableField
      fieldName="Role"
      :schema="role"
      :default-value="user!.userRole"
      type="select"
      :options="UserRole"
      :entity-id="user!.id"
      @save="handleSave"
    />
  </div>
</template>
<style scoped></style>
