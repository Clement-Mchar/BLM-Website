<script setup lang="ts">
import { EditableArea, EditableCancelTrigger, EditableEditTrigger, EditablePreview, EditableRoot, EditableSubmitTrigger } from "radix-vue";
import { useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import type { ZodSchema } from "zod";
import TipTap from "@/components/TipTap.vue";

const props = defineProps<{
  fieldName: string;
  defaultValue: string | undefined;
  entityId: number | string;
  type?: "select" | "text";
  options?: Record<string, string>;
  schema: ZodSchema;
  onSave: (fieldName: string, value: string) => void;
}>();

const validateFn = props.schema ? toTypedSchema(props.schema) : undefined;

const { value: inputValue, validate } = useField(props.fieldName, validateFn, {
  initialValue: props.defaultValue,
});
const handleSubmit = async () => {
  if (validateFn) {
    const valid = await validate();
    if (!valid) return;
  }
  props.onSave(props.fieldName, inputValue.value);
};
</script>

<template>
  <EditableRoot
    class="flex flex-col w-96"
    :defaultValue="props.defaultValue"
    :modelValue="inputValue"
    @update:model-value="(val) => (inputValue = val)"
    auto-resize
    v-slot="{ isEditing }"
    submit-mode="none"
    @submit="handleSubmit"
  >
    <div class="mt-1 mb-1 place-self-center">{{ fieldName }}</div>

    <div class="flex flex-row border-gray-300 border-solid border-[1px] rounded-md w-full justify-start mb-3">
      <EditableArea class="min-w-full rounded-md">
        <EditablePreview v-if="!isEditing" class="bg-gray-800 pt-[6px] rounded-md pl-2 min-w-full flex flex-wrap" />
        <TipTap v-else :defaultValue="props.defaultValue" v-model="inputValue" class="flex w-full h-16" focus="none" />
      </EditableArea>
      <EditableEditTrigger v-if="!isEditing" class="ml-2" />

      <slot />
      <div class="flex flex-row m-1">
        <EditableSubmitTrigger class="mr-2 ml-2" />
        <EditableCancelTrigger />
      </div>
    </div>
  </EditableRoot>
</template>
