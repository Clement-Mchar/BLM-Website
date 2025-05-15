<template>
  <editor-content :editor="editor" />
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import { watch, toRef, onBeforeUnmount } from "vue";

const props = defineProps<{
  modelValue?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", payload: string): void;
}>();

const editor = useEditor({
  content: props.modelValue,
  extensions: [StarterKit],
  onUpdate({ editor }) {
    emit("update:modelValue", editor.getHTML());
  },
});

watch(toRef(props, "modelValue"), (newVal) => {
  if (editor.value && newVal !== editor.value.getHTML()) {
    editor.value.commands.setContent(newVal || "", false);
  }
});

onBeforeUnmount(() => {
  editor.value?.destroy();
});
</script>
