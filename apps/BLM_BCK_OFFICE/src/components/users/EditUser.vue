<script setup lang="ts">
import EditableField from "../ui/editable/EditableField.vue";
import { useRoute, useRouter } from "vue-router";
import { useUpdateUser, useUserToEdit } from "@blm/shared";
import { z } from "zod";
import { UserRole } from "../../../../BLM_BCK/app/enums";
import { useToast } from "../ui/toast";
import ToastAction from "../ui/toast/ToastAction.vue";
import { h } from "vue";
import { validateWithZod } from "@/lib/utils";

const route = useRoute();
const router = useRouter();
import { ref, watch } from "vue";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const userId = Number(route.params.id);

const { data: user, isLoading } = useUserToEdit(userId);
const updateUser = useUpdateUser(userId);

const username = z.string().min(3, { message: "Must be 3 or more characters long" }).max(20);
const userRole = z.nativeEnum(UserRole);

const selectedRole = ref<string>(user.value?.userRole.toString() ?? "");

watch(user, () => {
  selectedRole.value = user.value?.userRole.toString() ?? "";
});
const handleSave = (fieldName: string, value: string | number) => {
  const key = fieldName as keyof typeof user.value;
  let validationResult;
  const { toast } = useToast();
  const schemaMap = {
    username: username,
    userRole: userRole,
  };
  const schema = schemaMap[key];

  if (schema) {
    validationResult = validateWithZod(schema, value);
  }
  if (!validationResult?.isValid) {
    toast({
      title: "Update error",
      description: `(${validationResult?.errorMessage})`,
      variant: "destructive",
      duration: 5000,
      action: h(ToastAction, { altText: `(${validationResult?.errorMessage})` }, { default: () => "Try again" }),
    });
    return;
  }
  if (!user.value) {
    console.log("User data undefined");
    return;
  }

  updateUser.mutate(
    {
      id: user!.value.id,
      payload: {
        [key]: value,
      },
    },
    {
      onSuccess: () => {
        console.log("User updated successfully");
        router.push("/back-office/users");
      },
      onError: (error) => {
        console.error("Update failed", error);
      },
    },
  );
};
</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="user" class="mt-4">
    <EditableField fieldName="username" :schema="username" :default-value="user!.username" :entity-id="user!.id" @save="handleSave" />
    <Select
      v-model="selectedRole"
      @update:modelValue="
        (val) => {
          if (typeof val === 'string') handleSave('userRole', val);
        }
      "
    >
      <SelectTrigger>
        <SelectValue placeholder="Select a user role" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem :value="UserRole.Admin.toString()">
            {{ UserRole.Admin }}
          </SelectItem>
          <SelectItem :value="UserRole.Webmaster.toString()">
            {{ UserRole.Webmaster }}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
</template>
<style scoped></style>
