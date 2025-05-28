<script setup lang="ts">
import { CalendarDate, DateFormatter, getLocalTimeZone, parseDate, today, type DateValue } from "@internationalized/date";
import { toTypedSchema } from "@vee-validate/zod";
import { Calendar as CalendarIcon, ChevronsUpDown } from "lucide-vue-next";
import { DateTime } from "luxon";
import { toDate } from "reka-ui/date";
import { useForm } from "vee-validate";
import { computed, h, isReactive, reactive, ref } from "vue";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "@/components/ui/toast";
import { useCreateAlbum } from "@/services/queries/useAlbums";
import { Input } from "@/components/ui/input";
import { useRouter } from "vue-router";
import {
  Combobox,
  ComboboxAnchor,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxList,
  ComboboxTrigger,
} from "@/components/ui/combobox";
import { useArtists } from "@/services/queries/useArtists";
const MAX_FILE_SIZE = 20000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/avif", "image/png", "image/webp"];
const df = new DateFormatter("en-US", {
  dateStyle: "long",
});

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(1).max(100),
    date: z.string().refine((v) => v, { message: "A release date is required." }),
    cover: z
      .instanceof(File)
      .refine((file) => file.size <= MAX_FILE_SIZE, `File size must be less than ${MAX_FILE_SIZE / 20000000}MB`)
      .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), "File type not supported")
      .optional(),
    link: z.string().url().optional(),
    artistIds: z.array(z.string()).min(1),
  }),
);

const placeholder = reactive({});

const form = useForm({
  validationSchema: formSchema,
  initialValues: {},
});
const createAlbum = useCreateAlbum();
const router = useRouter();
const value = computed({
  get: () => (form.values.date ? parseDate(form.values.date) : undefined),
  set: (val) => val,
});
const onSubmit = form.handleSubmit((values) => {
  const payload = {
    ...values,
    date: DateTime.fromISO(values.date).toISO() ?? "",
  };
  createAlbum.mutate(payload, {
    onSuccess: () => {
      router.push({ name: "albums" });
    },
  });
  toast({
    title: "You submitted the following values:",
    description: h(
      "pre",
      { class: "mt-2 w-[340px] rounded-md bg-slate-950 p-4" },
      h("code", { class: "text-white" }, JSON.stringify(payload, null, 2)),
    ),
  });
});
const coverUrl = computed(() => {
  const maybeFile = form.values.cover;
  if (maybeFile instanceof File) {
    return URL.createObjectURL(maybeFile);
  }
  return null;
});
</script>

<template>
  <form class="space-y-8" @submit.prevent="onSubmit">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Name</FormLabel>
        <FormControl>
          <Input type="text" placeholder="Name" autocomplete="name" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField name="date">
      <FormItem class="flex flex-col">
        <FormLabel>Date</FormLabel>
        <Popover>
          <PopoverTrigger as-child>
            <FormControl>
              <Button variant="outline" :class="cn('w-[240px] ps-3 text-start font-normal', !value && 'text-muted-foreground')">
                <span>{{ value ? df.format(toDate(value)) : "Pick a date" }}</span>
                <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
              </Button>
              <input hidden />
            </FormControl>
          </PopoverTrigger>
          <PopoverContent class="w-auto p-0">
            <Calendar
              v-model="value"
              calendar-label="Date"
              initial-focus
              :min-value="new CalendarDate(1900, 1, 1)"
              :max-value="today(getLocalTimeZone())"
              @update:model-value="
                (v) => {
                  console.log('update:model-value', v, typeof v);
                  console.log('isReactive:', isReactive(v));
                  form.setFieldValue('date', v!.toString());
                }
              "
            />
          </PopoverContent>
        </Popover>
        <FormDescription> Pick a release date </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ handleChange, handleBlur }" name="cover">
      <FormItem>
        <FormLabel>Cover</FormLabel>
        <div class="flex place-content-center" v-if="coverUrl">
          <img :src="coverUrl" alt="Cover" class="w-32 h-32 rounded-full" />
        </div>
        <FormControl>
          <Input id="picture" type="file" @change="handleChange" @blur="handleBlur" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button type="submit"> Submit </Button>
  </form>
</template>
