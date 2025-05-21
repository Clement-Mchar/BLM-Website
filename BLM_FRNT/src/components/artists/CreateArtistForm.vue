<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";
import Button from "@/components/Button.vue";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "vue-router";
import { useCreateArtist } from "@/services/queries/useArtists";
import { computed } from "vue";
import TipTap from "../TipTap.vue";
const MAX_FILE_SIZE = 20000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/avif", "image/png", "image/webp"];
const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(2).max(50),
    bio: z
      .string()
      .max(5000)
      .optional()
      .transform((val) => val?.replace(/<[^>]+>/g, "").trim()),
    genre: z.string().optional(),
    twitter: z.string().url().optional(),
    spotify: z.string().url().optional(),
    avatar: z
      .instanceof(File)
      .refine((file) => file.size <= MAX_FILE_SIZE, `File size must be less than ${MAX_FILE_SIZE / 20000000}MB`)
      .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), "File type not supported")
      .optional(),
    insta: z.string().url().optional(),
    role: z.string().optional(),
  }),
);

const form = useForm({
  validationSchema: formSchema,
});

const createArtist = useCreateArtist();
const router = useRouter();

const onSubmit = form.handleSubmit((values) => {
  createArtist.mutate(values, {
    onSuccess: () => {
      router.push({ name: "artists" });
    },
  });
});

const avatarUrl = computed(() => {
  const maybeFile = form.values.avatar;
  if (maybeFile instanceof File) {
    return URL.createObjectURL(maybeFile);
  }
  return null;
});
</script>

<template>
  <div class="flex flex-row justify-center w-8/12 m-2">
    <form class="w-full" @submit.prevent="onSubmit">
      <FormField v-slot="{ componentField }" name="name">
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Name" autocomplete="name" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="bio">
        <FormItem>
          <FormLabel>Bio</FormLabel>
          <FormControl class="min-w-fit w-96 h-56">
            <TipTap v-bind="componentField" class="border rounded-sm border-gray-200 w-full h-56" focus="none" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="spotify">
        <FormItem>
          <FormLabel>Spotify</FormLabel>
          <FormControl>
            <Input type="text" placeholder="spotify" autocomplete="spotify" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="genre">
        <FormItem>
          <FormLabel>Genre</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Genre" autocomplete="Genre" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="twitter">
        <FormItem>
          <FormLabel>Twitter</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Twitter" autocomplete="Twitter" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ handleChange, handleBlur }" name="avatar">
        <FormItem>
          <FormLabel>Avatar</FormLabel>
          <div class="flex place-content-center" v-if="avatarUrl">
            <img :src="avatarUrl" alt="Avatar" class="w-32 h-32 rounded-full" />
          </div>
          <FormControl>
            <Input id="picture" type="file" @change="handleChange" @blur="handleBlur" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="insta">
        <FormItem>
          <FormLabel>Instagram</FormLabel>
          <FormControl>
            <Input type="text" placeholder="insta" autocomplete="insta" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="role">
        <FormItem>
          <FormLabel>Role</FormLabel>
          <FormControl>
            <Input type="text" placeholder="role" autocomplete="role" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <Button type="submit" text="Submit" class="mt-5" />
    </form>
  </div>
</template>
<style>
.ProseMirror-focused {
  outline: none !important;
  border: none !important;
  box-shadow: none !important;
  width: 100% !important;
  height: 100% !important;
}
.ProseMirror {
  outline: none !important;
  border: none !important;
  box-shadow: none !important;
  width: 100% !important;
  height: 100% !important;
}
</style>
