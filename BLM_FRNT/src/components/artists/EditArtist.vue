<script setup lang="ts">
import EditableField from "../ui/editable/EditableField.vue";
import { useRoute, useRouter } from "vue-router";
import { useUpdateArtist, useArtist, useUpdateArtistAvatar } from "@/services/queries/useArtists";
import { z } from "zod";
import { useToast } from "../ui/toast";
import ToastAction from "../ui/toast/ToastAction.vue";
import { h } from "vue";
import { validateWithZod } from "@/lib/utils";
import Input from "../ui/input/Input.vue";
import { useField, type Field } from "vee-validate";
const route = useRoute();
const router = useRouter();

const artistId = String(route.params.id);

const { data: artist, isLoading } = useArtist(artistId);
const updateArtist = useUpdateArtist(artistId);
const MAX_FILE_SIZE = 20000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/avif", "image/png", "image/webp"];
const avatar = z
  .instanceof(File)
  .refine((file) => file.size <= MAX_FILE_SIZE, `File size must be less than ${MAX_FILE_SIZE / 20000000}MB`)
  .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), "File type not supported")
  .optional();

const name = z.string().min(3, { message: "Must be 3 or more characters long" }).max(20);
const bio = z
  .string()
  .max(5000)
  .optional()
  .transform((val) => val?.replace(/<[^>]+>/g, "").trim());
const genre = z.string().optional();
const spotify= z.string().url().optional();
const twitter = z.string().url().optional();

const insta = z.string().url().optional();
const role = z.string().optional();
const { toast } = useToast();
const handleSave = (fieldName: string, value: string) => {
  const key = fieldName?.toLowerCase();
  let validationResult;


  if (fieldName === "Name") {
    validationResult = validateWithZod(name, value);
  } else if (fieldName === "Role") {
    validationResult = validateWithZod(role, value);
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
  if (!artist.value) return;
  updateArtist.mutate(
    {
      id: artist!.value.id,
      payload: {
        [key]: value,
      },
    },
    {
      onSuccess: () => {
        router.push("/back-office/artists");
      },
    },
  );
};
const { mutate: updateAvatar } = useUpdateArtistAvatar(artistId);

const handleChange = async (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];

  if (!file) return;

  const validationResult = validateWithZod(avatar, file);
  if (!validationResult.isValid) {
    toast({
      title: "Invalid file",
      description: validationResult.errorMessage,
      variant: "destructive",
    });
    return;
  }
    const formData = new FormData();
  formData.append("avatar", file);

  // Envoi via mutation
  updateAvatar(
    { id: artistId, payload: formData },
    {
      onSuccess: () => {
        toast({ title: "Avatar updated!" });
      },
      onError: (err: any) => {
        toast({
          title: "Upload failed",
          description: err?.message || "An error occurred",
          variant: "destructive",
        });
      },
    }
  );
}


</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="artist" class="mt-4">
    <EditableField fieldName="Name" :schema="name" :default-value="artist!.name" :entity-id="artist!.id" @save="handleSave" />
    <EditableField fieldName="Bio" :schema="bio" :default-value="artist!.bio" :entity-id="artist!.id" @save="handleSave" />
    <EditableField fieldName="Genre" :schema="genre" :default-value="artist!.genre" :entity-id="artist!.id" @save="handleSave" />
    <EditableField fieldName="Twitter" :schema="twitter" :default-value="artist!.twitter" :entity-id="artist!.id" @save="handleSave" />
    <EditableField fieldName="Insta" :schema="insta" :default-value="artist!.insta" :entity-id="artist!.id" @save="handleSave" />
    <EditableField fieldName="Spotify" :schema="spotify" :default-value="artist!.spotify" :entity-id="artist!.id" @save="handleSave" />
    <Input id="picture" type="file" @change="handleChange" />
  </div>
</template>
<style scoped></style>
