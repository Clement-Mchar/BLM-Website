<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";
import Button from "@/components/Button.vue";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "vue-router";
import { useCreatePost } from "@/services/queries/usePosts";
import { computed, h } from "vue";
import TipTap from "../TipTap.vue";
import { toast } from "../ui/toast";
import { PostCategory } from "../../../../BLM_BCK/app/enums";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useArtists } from "@/services/queries/useArtists";
import { useAlbums } from "@/services/queries/useAlbums";
import ComboBox from "../ComboBox.vue";

const MAX_FILE_SIZE = 20000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/avif", "image/png", "image/webp"];
const { data: artists } = useArtists();
const { data: albums } = useAlbums();

const formSchema = toTypedSchema(
  z.object({
    title: z.string().min(1).max(100),
    body: z.string().max(10000),
    header: z
      .instanceof(File)
      .refine((file) => file.size <= MAX_FILE_SIZE, `File size must be less than ${MAX_FILE_SIZE / 20000000}MB`)
      .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), "File type not supported")
      .optional(),
    category: z.nativeEnum(PostCategory),
    artistIds: z.array(z.string()).optional(),
    albumIds: z.array(z.string()).optional(),
  }),
);

const form = useForm({
  validationSchema: formSchema,
});

const createPost = useCreatePost();
const router = useRouter();
const categories = Object.values(PostCategory);
const onSubmit = form.handleSubmit((values) => {
  createPost.mutate(values, {
    onSuccess: () => {
      router.push({ name: "posts" });
      toast({
        title: "You submitted the following values:",
        description: h(
          "pre",
          { class: "mt-2 w-[340px] rounded-md bg-slate-950 p-4" },
          h("code", { class: "text-white" }, JSON.stringify(values, null, 2)),
        ),
      });
    },
  });
});

const headerUrl = computed(() => {
  const maybeFile = form.values.header;
  if (maybeFile instanceof File) {
    return URL.createObjectURL(maybeFile);
  }
  return null;
});
</script>

<template>
  <div class="flex flex-row justify-center w-8/12 m-2">
    <form class="w-full" @submit.prevent="onSubmit">
      <FormField v-slot="{ componentField }" name="title">
        <FormItem>
          <FormLabel>Title</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Title" autocomplete="title" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="body">
        <FormItem>
          <FormLabel>Body</FormLabel>
          <FormControl class="min-w-fit w-96 h-56">
            <TipTap v-bind="componentField" class="" focus="none" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ handleChange, handleBlur }" name="header">
        <FormItem>
          <FormLabel>Header</FormLabel>
          <div class="flex place-content-center" v-if="headerUrl">
            <img :src="headerUrl" alt="Header" class="w-32 h-32 rounded-full" />
          </div>
          <FormControl>
            <Input id="picture" type="file" @change="handleChange" @blur="handleBlur" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="category">
        <FormItem>
          <FormLabel>Category</FormLabel>
          <Select v-bind="componentField">
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                <SelectItem v-for="category in categories" :key="category" :value="category">
                  {{ category }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ value, handleChange }" name="artistIds">
        <FormItem>
          <FormLabel>Artists</FormLabel>
          <FormControl>
            <ComboBox :items="artists ?? []" :model-value="value" @update:modelValue="handleChange" placeholder="Select artists" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ value, handleChange }" name="albumIds">
        <FormItem>
          <FormLabel>Albums</FormLabel>
          <FormControl>
            <ComboBox :items="albums ?? []" :model-value="value" @update:modelValue="handleChange" placeholder="Select albums" />
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
