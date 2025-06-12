<script setup lang="ts">
import EditableField from "../ui/editable/EditableField.vue";
import { useRoute, useRouter } from "vue-router";
import { useUpdateEvent, useEvent } from "@/services/queries/useEvents";
import { z } from "zod";
import { useToast } from "../ui/toast";
import ToastAction from "../ui/toast/ToastAction.vue";
import { h } from "vue";
import { validateWithZod } from "@/lib/utils";
import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date";

import DatePicker from "../DatePicker.vue";
import { useArtists } from "@/services/queries/useArtists";
import ComboBox from "../ComboBox.vue";
import { ref, watch } from "vue";

const eventArtistIds = ref<string[]>([]);

const route = useRoute();
const router = useRouter();
const eventId = String(route.params.id);
const updateEvent = useUpdateEvent(eventId);

const { data: event, isLoading } = useEvent(eventId);

const name = z.string().min(1).max(100).optional();
const date = z
  .string()
  .refine((v) => v, { message: "A release date is required." })
  .optional();
const description = z.string().min(1).max(1000).optional();
const location = z.string().min(1).max(255).optional();
const reservation = z.string().url().optional();
const artistIds = z.array(z.string()).min(1).optional();
const { toast } = useToast();
const { data: artists } = useArtists();

watch(
  () => event.value?.artistIds,
  (newIds) => {
    if (newIds) eventArtistIds.value = [...newIds];
  },
  { immediate: true },
);
function saveArtistIds() {
  const validationResult = validateWithZod(artistIds, eventArtistIds.value);

  if (!validationResult.isValid) {
    toast({
      title: "Invalid artist list",
      description: validationResult.errorMessage,
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

  if (!event.value) return;

  updateEvent.mutate(
    {
      id: event.value.id,
      payload: {
        artistIds: eventArtistIds.value,
      },
    },
    {
      onSuccess: () => {
        toast({ title: "Artists updated!" });
      },
      onError: (error) => {
        console.error("Update failed", error);
        toast({
          title: "Update failed",
          description: error.message || "An error occurred",
          variant: "destructive",
        });
      },
    },
  );
}
const handleSave = (fieldName: string, value: string | string[]) => {
  const key = fieldName?.toLowerCase() as keyof typeof event.value;
  let validationResult;
  const schemaMap = {
    name: name,
    date: date,
    description: description,
    location: location,
    reservation: reservation,
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
  if (!event.value) return;
  updateEvent.mutate(
    {
      id: event!.value.id,
      payload: {
        [key]: value,
      },
    },
    {
      onSuccess: () => {
        router.push({ name: "events" });
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
  <div v-else-if="event" class="mt-4">
    <EditableField fieldName="Name" :schema="name" :default-value="event!.name" :entity-id="event!.id" @save="handleSave" />
    <EditableField fieldName="Description" :schema="description" :default-value="event!.description" :entity-id="event!.id" @save="handleSave" />
    <DatePicker
      :schema="date"
      fieldName="Date"
      initial-focus
      :min-value="new CalendarDate(1900, 1, 1)"
      :max-value="today(getLocalTimeZone())"
      @update:model-value="
        (val) => {
          if (val) handleSave('date', val.toString());
        }
      "
    />
    <EditableField fieldName="Location" :schema="location" :default-value="event!.location" :entity-id="event!.id" @save="handleSave" />
    <EditableField fieldName="Reservation" :schema="reservation" :default-value="event!.reservation" :entity-id="event!.id" @save="handleSave" />
    
    <ComboBox v-if="artists && event" :items="artists" :model-value="eventArtistIds" @update:modelValue="(val) => (eventArtistIds = val)" />
    <button @click="saveArtistIds">Sauvegarder les artistes</button>
  </div>
</template>
