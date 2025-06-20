<script setup lang="ts">
import { CalendarDate, getLocalTimeZone, parseDate, today } from "@internationalized/date";
import { toTypedSchema } from "@vee-validate/zod";
import { DateTime } from "luxon";
import { useForm } from "vee-validate";
import { computed, h } from "vue";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/components/ui/toast";
import { useCreateEvent } from "@/services/queries/useEvents";
import { Input } from "@/components/ui/input";
import { useRouter } from "vue-router";
import { useArtists } from "@/services/queries/useArtists";
import DatePicker from "../DatePicker.vue";
import ComboBox from "../ComboBox.vue";
const { data: artists } = useArtists();

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(1).max(200),
    date: z.string().refine((v) => v, { message: "A date is required." }),
    description: z.string().min(1).max(1000).optional(),
    location: z.string().min(1).max(255),
    reservation: z.string().url().optional(),
    artistIds: z.array(z.string()).min(1).optional(),
  }),
);
const form = useForm({
  validationSchema: formSchema,
  initialValues: { artistIds: [] },
});

const createEvent = useCreateEvent();
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
  createEvent.mutate(payload, {
    onSuccess: () => {
      router.push({ name: "events" });
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
        <FormControl>
          <DatePicker
            v-model="value"
            calendar-label="Date"
            initial-focus
            :min-value="new CalendarDate(1900, 1, 1)"
            :max-value="today(getLocalTimeZone())"
            @update:model-value="
              (v) => {
                form.setFieldValue('date', v!.toString());
              }
            "
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="description">
      <FormItem>
        <FormLabel>Description</FormLabel>
        <FormControl>
          <Input type="text" placeholder="description" autocomplete="description" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="location">
      <FormItem>
        <FormLabel>Location</FormLabel>
        <FormControl>
          <Input type="text" placeholder="location" autocomplete="location" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="reservation">
      <FormItem>
        <FormLabel>Reservation</FormLabel>
        <FormControl>
          <Input type="text" placeholder="reservation" autocomplete="reservation" v-bind="componentField" />
        </FormControl>
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
    <Button type="submit"> Submit </Button>
  </form>
</template>
