<script setup lang="ts">
import EditableField from "../ui/editable/EditableField.vue";
import { useRoute, useRouter } from "vue-router";
import { useUpdateAlbum, useAlbum, useUpdateAlbumCover, useArtists } from "@blm/shared";
import { z } from "zod";
import { useToast } from "../ui/toast";
import ToastAction from "../ui/toast/ToastAction.vue";
import { h } from "vue";
import { validateWithZod } from "@/lib/utils";
import Input from "../ui/input/Input.vue";
import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date";

import DatePicker from "../DatePicker.vue";
import ComboBox from "../ComboBox.vue";
import { ref, watch } from "vue";

const albumArtistIds = ref<string[]>([]);

const route = useRoute();
const router = useRouter();
const albumId = String(route.params.id);
const updateAlbum = useUpdateAlbum(albumId);
const MAX_FILE_SIZE = 20000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/avif", "image/png", "image/webp"];

const { data: album, isLoading } = useAlbum(albumId);

const name = z.string().min(1).max(100).optional();
const date = z
  .string()
  .refine((v) => v, { message: "A release date is required." })
  .optional();
const cover = z
  .instanceof(File)
  .refine((file) => file.size <= MAX_FILE_SIZE, `File size must be less than ${MAX_FILE_SIZE / 20000000}MB`)
  .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), "File type not supported")
  .optional();
const link = z.string().url().optional();
const artistIds = z.array(z.string()).min(1);
const { toast } = useToast();
const { mutate: updateCover } = useUpdateAlbumCover(albumId);
const { data: artists } = useArtists();

watch(
  () => album.value?.artistIds,
  (newIds) => {
    if (newIds) albumArtistIds.value = [...newIds];
  },
  { immediate: true },
);
function saveArtistIds() {
  const validationResult = validateWithZod(artistIds, albumArtistIds.value);

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

  if (!album.value) return;

  updateAlbum.mutate(
    {
      id: album.value.id,
      payload: {
        artistIds: albumArtistIds.value,
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
  const key = fieldName?.toLowerCase() as keyof typeof album.value;
  let validationResult;
  const schemaMap = {
    name: name,
    date: date,
    cover: cover,
    link: link,
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
  if (!album.value) return;
  updateAlbum.mutate(
    {
      id: album!.value.id,
      payload: {
        [key]: value,
      },
    },
    {
      onSuccess: () => {
        router.push({ name: "albums" });
      },
      onError: (error) => {
        console.error("Update failed", error);
      },
    },
  );
};
const handleChange = async (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];

  if (!file) return;

  const validationResult = validateWithZod(cover, file);
  if (!validationResult.isValid) {
    toast({
      title: "Invalid file",
      description: validationResult.errorMessage,
      variant: "destructive",
    });
    return;
  }
  const formData = new FormData();
  formData.append("cover", file);

  updateCover(
    { id: albumId, payload: formData },
    {
      onSuccess: () => {
        toast({ title: "Cover updated!" });
      },
      onError: (err: any) => {
        toast({
          title: "Upload failed",
          description: err?.message || "An error occurred",
          variant: "destructive",
        });
      },
    },
  );
};
</script>
<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="album" class="mt-4">
    <EditableField fieldName="Name" :schema="name" :default-value="album!.name" :entity-id="album!.id" @save="handleSave" />
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
    <EditableField fieldName="Link" :schema="link" :default-value="album!.link" :entity-id="album!.id" @save="handleSave" />
    <div class="mt-1 mb-1 place-self-center">Cover</div>
    <Input id="picture" type="file" :schema="cover" @change="handleChange" />
    <ComboBox v-if="artists && album" :items="artists" :model-value="albumArtistIds" @update:modelValue="(val) => (albumArtistIds = val)" />
    <button @click="saveArtistIds">Sauvegarder les artistes</button>
  </div>
</template>
