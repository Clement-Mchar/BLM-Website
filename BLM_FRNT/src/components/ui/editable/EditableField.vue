<script setup lang="ts">
import {
  EditableArea,
  EditableCancelTrigger,
  EditableEditTrigger,
  EditableInput,
  EditablePreview,
  EditableRoot,
  EditableSubmitTrigger,
} from "radix-vue";
import { ref } from "vue";

const props = defineProps<{
  fieldName: string;
  defaultValue: string;
  entityId: number;
  onSave: (fieldName: string, value: string) => void;
}>();

const inputValue = ref(props.defaultValue);

const handleSubmit = () => {
  props.onSave(props.fieldName, inputValue.value);
};
</script>

<template>
  <EditableRoot
    class="flex flex-col"
    :defaultValue="props.defaultValue"
    :modelValue="inputValue"
    @update:model-value="(val) => (inputValue = val)"
    auto-resize
    v-slot="{ isEditing }"
    submit-mode="none"
    @submit="handleSubmit"
  >
    <div>{{ fieldName }}</div>
    <EditableArea>
      <EditablePreview class="bg-gray-800" />
      <EditableInput />
    </EditableArea>
    <EditableEditTrigger v-if="!isEditing" />
    <div class="flex flex-row">
      <EditableSubmitTrigger />
      <EditableCancelTrigger />
    </div>
    <slot />
  </EditableRoot>
</template>
