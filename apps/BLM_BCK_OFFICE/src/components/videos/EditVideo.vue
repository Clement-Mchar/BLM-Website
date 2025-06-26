<script setup lang="ts">
import EditableField from "../ui/editable/EditableField.vue";
import { useRoute, useRouter } from "vue-router";
import { useUpdateVideo, useVideo, useArtists } from "@blm/shared";
import { z } from "zod";
import { useToast } from "../ui/toast";
import ToastAction from "../ui/toast/ToastAction.vue";
import { h, ref, watch } from "vue";
import { validateWithZod } from "@/lib/utils";
import { VideoCategory } from "../../../../BLM_BCK/app/enums";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ComboBox from "../ComboBox.vue";

const route = useRoute();
const router = useRouter();

const videoId = String(route.params.id);
const { data: video, isLoading } = useVideo(videoId);
const { data: artists } = useArtists();
const updateVideo = useUpdateVideo(videoId);

const title = z.string().min(1, { message: "Must be 3 or more characters long" }).max(20);
const url = z.string().url().optional();
const category = z.nativeEnum(VideoCategory).optional();
const artistIds = z.array(z.string()).min(1).optional();

const categories = Object.values(VideoCategory);
const selectedCategory = ref<string>(video.value?.category.toString() ?? "");
const videoArtistIds = ref<string[]>([]);
const { toast } = useToast();
watch(video, () => {
  selectedCategory.value = video.value?.category.toString() ?? "";
});

watch(
  () => video.value?.artistIds,
  (newIds) => {
    if (newIds) videoArtistIds.value = [...newIds];
  },
  { immediate: true },
);

function saveArtistIds() {
  const validationResult = validateWithZod(artistIds, videoArtistIds.value);

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

  if (!video.value) return;

  updateVideo.mutate(
    {
      id: video.value.id,
      payload: {
        artistIds: videoArtistIds.value,
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
const handleSave = (fieldName: string, value: string) => {
  const key = fieldName?.toLowerCase() as keyof typeof video.value;
  let validationResult;
  const schemaMap = {
    title: title,
    url: url,
    category: category,
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
  if (!video.value) return;
  updateVideo.mutate(
    {
      id: video!.value.id,
      payload: {
        [key]: value,
      },
    },
    {
      onSuccess: () => {
        router.push("/back-office/videos");
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
  <div v-else-if="video" class="mt-4">
    <EditableField fieldName="Title" :schema="title" :default-value="video!.title" :entity-id="video!.id" @save="handleSave" />
    <EditableField fieldName="Url" :schema="url" :default-value="video!.url" :entity-id="video!.id" @save="handleSave" />

    <Select
      v-model="selectedCategory"
      @update:modelValue="
        (val) => {
          if (typeof val === 'string') handleSave('category', val);
        }
      "
    >
      <SelectTrigger>
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    <div class="mt-1 mb-1 place-self-center">Related Artists</div>
    <ComboBox v-if="artists && video" :items="artists" :model-value="videoArtistIds" @update:modelValue="(val) => (videoArtistIds = val)" />
    <button @click="saveArtistIds">Sauvegarder les artistes</button>
  </div>
</template>
<style scoped></style>
