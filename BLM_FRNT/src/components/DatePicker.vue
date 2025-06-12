<script setup lang="ts">
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-vue-next";
import { useAttrs } from "vue";
import { toDate } from "reka-ui/date";
import { CalendarDate, DateFormatter, type DateValue } from "@internationalized/date";
import { cn } from "@/lib/utils";

const attrs = useAttrs();
const df = new DateFormatter("en-US", { dateStyle: "long" });

const props = defineProps<{
  modelValue?: CalendarDate | DateValue;
  fieldName?: string;
  defaultValue?:  CalendarDate | DateValue;
  entityId?: number | string;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();
function getDateValue(value?: CalendarDate | DateValue): DateValue {
  if (!value) return new CalendarDate(2000, 1, 1);
  return value;
}
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="ghost"
        :class="cn('w-[240px] ps-3 text-start font-normal', !props.modelValue && 'text-muted-foreground')"
        class="border border-gray-200"
      >
        <span>
          {{ props.modelValue ? df.format(toDate(getDateValue(props.modelValue))) : "Pick a date" }}
        </span>
        <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
      </Button>
      <input hidden />
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Calendar
        v-bind="attrs"
        :default-value="defaultValue"
        :value="getDateValue(props.modelValue)"
        @update:model-value="
          (v) => {
            console.log('Date sélectionnée:', v?.toString());
            if (v) emit('update:modelValue', v!.toString());
          }
        "
      />
    </PopoverContent>
  </Popover>
</template>
