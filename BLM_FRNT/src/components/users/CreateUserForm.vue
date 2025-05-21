<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";
import { UserRole } from "../../../../BLM_BCK/app/enums";
import Button from "@/components/Button.vue";
import { useField } from "vee-validate";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useCreateUser } from "@/services/queries/useUsers";
import { useRouter } from "vue-router";

const formSchema = toTypedSchema(
  z.object({
    username: z.string().min(3).max(20),
    passwordConfirmation: z
      .object({
        password: z.string().min(8).max(50),
        confirmPassword: z.string(),
      })
      .superRefine((val, ctx) => {
        if (val.password !== val.confirmPassword) {
          ctx.addIssue({
            path: ["confirmPassword"],
            code: z.ZodIssueCode.custom,
            message: "Passwords dont match",
          });
        }
      }),
    userRole: z.nativeEnum(UserRole),
  }),
);

const form = useForm({
  validationSchema: formSchema,
});
const { value: password } = useField("passwordConfirmation.password");

const createUser = useCreateUser();
const router = useRouter();

const onSubmit = form.handleSubmit((values) => {
  createUser.mutate(values, {
    onSuccess: () => {
      router.push("/back-office/users");
    },
  });
});
</script>

<template>
  <div class="flex flex-row justify-center w-8/12 m-2">
    <form class="w-full" @submit.prevent="onSubmit">
      <FormField v-slot="{ componentField }" name="username">
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Username" autocomplete="username" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="passwordConfirmation.password">
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input type="password" placeholder="Password" autocomplete="new-password" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-if="password" v-slot="{ componentField }" name="passwordConfirmation.confirmPassword">
        <FormItem>
          <FormLabel>Confirm password</FormLabel>
          <FormControl>
            <Input type="password" placeholder="Confirm password" autocomplete="eizapoeiaz" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="role">
        <FormItem>
          <FormLabel>Role</FormLabel>
          <Select v-bind="componentField">
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a user role" />
              </SelectTrigger>
            </FormControl>
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
          <FormMessage />
        </FormItem>
      </FormField>
      <Button type="submit" text="Submit" class="mt-5" />
    </form>
  </div>
</template>
