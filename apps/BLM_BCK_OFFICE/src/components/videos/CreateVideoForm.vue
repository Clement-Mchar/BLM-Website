<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";
import Button from "@/components/Button.vue";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "vue-router";
import { useCreateVideo, useArtists } from "@blm/shared";
import { h } from "vue";
import { toast } from "../ui/toast";
import { VideoCategory } from "../../../../BLM_BCK/app/enums";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ComboBox from "../ComboBox.vue";
const { data: artists } = useArtists();

const formSchema = toTypedSchema(
  z.object({
    title: z.string().min(1).max(100),
    url: z.string().url().max(10000),
    category: z.nativeEnum(VideoCategory),
    artistIds: z.array(z.string()).optional(),
  }),
);

const form = useForm({
  validationSchema: formSchema,
});

const createVideo = useCreateVideo();
const router = useRouter();
const categories = Object.values(VideoCategory);
const onSubmit = form.handleSubmit((values) => {
  createVideo.mutate(values, {
    onSuccess: () => {
      router.push({ name: "videos" });
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
      <FormField v-slot="{ componentField }" name="url">
        <FormItem>
          <FormLabel>Url</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Url" autocomplete="url" v-bind="componentField" />
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
