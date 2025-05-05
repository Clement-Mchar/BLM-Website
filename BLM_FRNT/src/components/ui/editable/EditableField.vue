<script setup lang="ts">
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  EditableArea,
  EditableCancelTrigger,
  EditableEditTrigger,
  EditableInput,
  EditablePreview,
  EditableRoot,
  EditableSubmitTrigger,
} from "radix-vue";
import { useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import type { ZodSchema } from "zod";

const props = defineProps<{
  fieldName: string;
  defaultValue: string;
  entityId: number;
  type?: "select" | "text";
  options?: Record<string, string>;
  schema: ZodSchema;
  onSave: (fieldName: string, value: string) => void;
}>();

const validateFn = props.schema ? toTypedSchema(props.schema) : undefined;

const {
  value: inputValue,
  errorMessage,
  validate,
} = useField(props.fieldName, validateFn, {
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
  <div v-if="props.type === 'select' && props.options">
    <div class="mt-1 mb-1 place-self-center">{{ fieldName }}</div>
    <Select v-model="inputValue" @update:model-value="handleSubmit">
      <SelectTrigger class="bg-gray-800">
        <SelectValue placeholder="Select a user role" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem v-for="(value, key) in props.options" :key="key" :value="value">
            {{ key }}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
  <EditableRoot
    class="flex flex-col w-96"
    v-else
    :defaultValue="props.defaultValue"
    :modelValue="inputValue"
    @update:model-value="(val) => (inputValue = val)"
    auto-resize
    v-slot="{ isEditing }"
    submit-mode="none"
    @submit="handleSubmit"
  >
    <div class="mt-1 mb-1 place-self-center">{{ fieldName }}</div>

    <div class="flex flex-row border-gray-300 border-solid border-[1px] rounded-md w-full justify-start h-[37px] mb-3">
      <EditableArea class="min-w-full min-h-full rounded-md focus-within:bg-gray-600 focus-within:pl-2 mb-2">
        <EditablePreview class="bg-gray-800 pt-[6px] rounded-md pl-2 min-w-full min-h-full" />
        <EditableInput />
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
