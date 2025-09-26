<script setup lang="ts">
import { ref, computed } from "vue";
import { useFilter } from "reka-ui";

import { ChevronsUpDown } from "lucide-vue-next";
import { TagsInput, TagsInputInput, TagsInputItem, TagsInputItemDelete } from "@/components/ui/tags-input";
import { Combobox, ComboboxAnchor, ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox";
import ComboboxTrigger from "./ui/combobox/ComboboxTrigger.vue";

const props = defineProps({
  modelValue: {
    type: Array as () => string[],
    default: () => [],
  },
  items: {
    type: Array as () => { id: string; name: string }[],
    default: () => [],
  },
  placeholder: {
    type: String,
    default: "Select...",
  },
});

const emit = defineEmits(["update:modelValue"]);

const { contains } = useFilter({ sensitivity: "base" });

const open = ref(false);
const searchTerm = ref("");

const filteredItems = computed(() => {
  const selectedIds = new Set(props.modelValue);
  const options = props.items.filter((item) => !selectedIds.has(item.id));
  return searchTerm.value ? options.filter((opt) => contains(opt.name, searchTerm.value)) : options;
});

function selectItem(id: string) {
  if (!props.modelValue.includes(id)) {
    emit("update:modelValue", [...props.modelValue, id]);
  }
  searchTerm.value = "";
}

function removeItem(id: string) {
  emit(
    "update:modelValue",
    props.modelValue.filter((i) => i !== id),
  );
}
</script>

<template>
  <Combobox v-model:open="open" :ignore-filter="true" class="bg-gray-900">
    <ComboboxAnchor as-child>
      <TagsInput class="gap-2 w-80 flex flex-col bg-gray-900 p-0 border-none">
        <div class="flex flex-row w-full">
          <div class="gap-2 flex-wrap flex flex-row">
            <TagsInputItem v-for="item in items.filter((i) => modelValue.includes(i.id))" :key="item.id" :value="item.id" class="bg-gray-500">
              <span class="text-gray-200 pl-2">{{ item.name }}</span>
              <TagsInputItemDelete class="text-gray-200 size-[0.8rem]" @click.prevent="removeItem(item.id)" />
            </TagsInputItem>
          </div>
        </div>

        <div class="flex flex-row justify-between w-full border rounded-sm border-white">
          <ComboboxInput v-model="searchTerm" as-child>
            <TagsInputInput
              :placeholder="placeholder"
              class="min-w-[200px] w-full px-2 border-none focus-visible:ring-0 h-auto"
              @keydown.enter.prevent
            />
            <ComboboxTrigger>
              <ChevronsUpDown class="size-4" />
            </ComboboxTrigger>
          </ComboboxInput>
        </div>
      </TagsInput>

      <ComboboxList class="w-(--reka-popper-anchor-width)">
        <ComboboxEmpty />
        <ComboboxGroup>
          <ComboboxItem
            v-for="item in filteredItems"
            :key="item.id"
            :value="item.id"
            @select.prevent="(ev: CustomEvent) => selectItem(ev.detail.value)"
          >
            {{ item.name }}
          </ComboboxItem>
        </ComboboxGroup>
      </ComboboxList>
    </ComboboxAnchor>
  </Combobox>
</template>
