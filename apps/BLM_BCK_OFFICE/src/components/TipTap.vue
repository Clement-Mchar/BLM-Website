<template>
  <div v-if="editor" class="container flex flex-col break-all border rounded-sm border-gray-200 w-full h-80 overflow-hidden">
    <div class="control-group flex">
      <div class="button-group border-b-2 flex w-full flex-wrap pt-1 pb-1 border-gray-300">
        <button
          type="button"
          @click="editor.chain().focus().toggleBold().run()"
          :disabled="!editor.can().chain().focus().toggleBold().run()"
          :class="{ 'bg-gray-500': editor.isActive('bold') }"
          class="ml-1 mt-1 rounded-sm"
        >
          <Bold />
        </button>
        <button
          type="button"
          @click="editor.chain().focus().toggleItalic().run()"
          :disabled="!editor.can().chain().focus().toggleItalic().run()"
          :class="{ 'bg-gray-500': editor.isActive('italic') }"
          class="ml-1 mt-1 rounded-sm"
        >
          <Italic />
        </button>
        <button
          type="button"
          @click="editor.chain().focus().toggleStrike().run()"
          :disabled="!editor.can().chain().focus().toggleStrike().run()"
          :class="{ 'bg-gray-500': editor.isActive('strike') }"
          class="rounded-sm ml-1 flex justify-center mt-1 items-center"
        >
          <v-icon name="la-strikethrough-solid" scale="1.5" class="place-content-center" />
        </button>
        <button id="add" @click="insertYoutubeVideo">Add a video</button>
      </div>
    </div>
    <editor-content :editor="editor" class="p-2 h-full max-w-svh overflow-y-scroll overflow-x-hidden " />
  </div>
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import { watch, toRef, onBeforeUnmount } from "vue";
import Youtube from "@tiptap/extension-youtube";
import { Bold, Italic } from "lucide-vue-next";
const props = defineProps<{
  modelValue?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", payload: string): void;
}>();

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit,
    Youtube.configure({
      origin: 'http://localhost:5173/',
      nocookie: true,
      controls: true,
      enableIFrameApi: true,
    }),
  ],
  onUpdate({ editor }) {
    emit("update:modelValue", editor.getHTML());
  },
});

const insertYoutubeVideo = () => {
  const url = prompt("Entrez l’URL YouTube de la vidéo");
  if (!url) return;
  if (!editor.value) return;
  editor.value
    .chain()
    .focus()
    .enter()
    .setYoutubeVideo({
      src: url,
      width: 1080,
      height: 720,
    })
    .run();
};

watch(toRef(props, "modelValue"), (newVal) => {
  if (editor.value && newVal !== editor.value.getHTML()) {
    editor.value.commands.setContent(newVal || "", false);
  }
});

onBeforeUnmount(() => {
  editor.value?.destroy();
});
</script>
