<script setup lang="ts">
import EditableField from "../ui/editable/EditableField.vue";
import { useRoute, useRouter } from "vue-router";
import { useUpdatePost, usePost, useUpdatePostHeader } from "@/services/queries/usePosts";
import { z } from "zod";
import { useToast } from "../ui/toast";
import ToastAction from "../ui/toast/ToastAction.vue";
import { h, ref, watch } from "vue";
import { validateWithZod } from "@/lib/utils";
import Input from "../ui/input/Input.vue";
import EditableTipTap from "../ui/editable/EditableTipTap.vue";
import { PostCategory } from "../../../../BLM_BCK/app/enums";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useArtists } from "@/services/queries/useArtists";
import ComboBox from "../ComboBox.vue";
import { useAlbums } from "@/services/queries/useAlbums";

const route = useRoute();
const router = useRouter();

const postId = String(route.params.id);
const { data: post, isLoading } = usePost(postId);
const { data: artists } = useArtists();
const { data: albums } = useAlbums();
const updatePost = useUpdatePost(postId);
const MAX_FILE_SIZE = 20000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/avif", "image/png", "image/webp"];

const header = z
  .instanceof(File)
  .refine((file) => file.size <= MAX_FILE_SIZE, `File size must be less than ${MAX_FILE_SIZE / 20000000}MB`)
  .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), "File type not supported")
  .optional();

const title = z.string().min(1, { message: "Must be 3 or more characters long" }).max(20);
const body = z
  .string()
  .max(10000)
  .optional()
  .transform((val) => val?.replace(/<[^>]+>/g, "").trim());
const category = z.nativeEnum(PostCategory).optional();
const artistIds = z.array(z.string()).min(1).optional();
const albumIds = z.array(z.string()).min(1).optional();
const categories = Object.values(PostCategory);
const selectedCategory = ref<string>(post.value?.category.toString() ?? "");
const postArtistIds = ref<string[]>([]);
const postAlbumIds = ref<string[]>([]);
const { toast } = useToast();
watch(post, () => {
  selectedCategory.value = post.value?.category.toString() ?? "";
});

watch(
  () => post.value?.artistIds,
  (newIds) => {
    if (newIds) postArtistIds.value = [...newIds];
  },
  { immediate: true },
);
watch(
  () => post.value?.albumIds,
  (newIds) => {
    if (newIds) postAlbumIds.value = [...newIds];
  },
  { immediate: true },
);

function saveAlbumIds() {
  const validationResult = validateWithZod(albumIds, postAlbumIds.value);

  if (!validationResult.isValid) {
    toast({
      title: "Invalid album list",
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

  if (!post.value) return;

  updatePost.mutate(
    {
      id: post.value.id,
      payload: {
        artistIds: postArtistIds.value,
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
function saveArtistIds() {
  const validationResult = validateWithZod(artistIds, postArtistIds.value);

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

  if (!post.value) return;

  updatePost.mutate(
    {
      id: post.value.id,
      payload: {
        artistIds: postArtistIds.value,
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
  const key = fieldName?.toLowerCase() as keyof typeof post.value;
  let validationResult;
  const schemaMap = {
    title: title,
    category: category,
    header: header,
    body: body,
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
  if (!post.value) return;
  updatePost.mutate(
    {
      id: post!.value.id,
      payload: {
        [key]: value,
      },
    },
    {
      onSuccess: () => {
        router.push("/back-office/posts");
      },
      onError: (error) => {
        console.error("Update failed", error);
      },
    },
  );
};
const { mutate: updateHeader } = useUpdatePostHeader(postId);

const handleChange = async (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];

  if (!file) return;

  const validationResult = validateWithZod(header, file);
  if (!validationResult.isValid) {
    toast({
      title: "Invalid file",
      description: validationResult.errorMessage,
      variant: "destructive",
    });
    return;
  }
  const formData = new FormData();
  formData.append("header", file);

  updateHeader(
    { id: postId, payload: formData },
    {
      onSuccess: () => {
        toast({ title: "Header updated!" });
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
  <div v-else-if="post" class="mt-4">
    <EditableField fieldName="Title" :schema="title" :default-value="post!.title" :entity-id="post!.id" @save="handleSave" />
    <EditableTipTap fieldName="Body" :schema="body" :default-value="post!.body" :entity-id="post!.id" @save="handleSave" />
    <div class="mt-1 mb-1 place-self-center">Category</div>
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
    <div class="mt-1 mb-1 place-self-center">Header</div>
    <Input id="picture" type="file" :schema="header" @change="handleChange" />
    <div class="mt-1 mb-1 place-self-center">Related Artists</div>
    <ComboBox v-if="artists && post" :items="artists" :model-value="postArtistIds" @update:modelValue="(val) => (postArtistIds = val)" />
    <button @click="saveArtistIds">Sauvegarder les artistes</button>
    <div class="mt-1 mb-1 place-self-center">Related Albums</div>
    <ComboBox v-if="albums && post" :items="albums" :model-value="postAlbumIds" @update:modelValue="(val) => (postAlbumIds = val)" />
    <button @click="saveAlbumIds">Sauvegarder les lbumesseess</button>
  </div>
</template>
<style scoped></style>
