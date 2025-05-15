<script setup lang="ts" generic="TData extends { id: number | string }, TValue">
import type { ColumnDef, SortingState, VisibilityState, } from "@tanstack/vue-table";
import { useVueTable, getCoreRowModel, FlexRender, getSortedRowModel, getFilteredRowModel, getPaginationRowModel } from "@tanstack/vue-table";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import Button from "~/components/Button.vue";
import { valueUpdater } from "@/lib/utils";
import { h, ref } from "vue";
import { Trash2 } from "lucide-vue-next";
import ConfirmDialog from "./ConfirmDialog.vue";
import { useToast } from "./ui/toast";
import ToastAction from "./ui/toast/ToastAction.vue";
import { Input } from "@/components/ui/input";
const props = defineProps<{
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onDeleteSelected?: (ids: (string | number)[]) => void;
}>();

const sorting = ref<SortingState>([]);
const rowSelection = ref({});
const globalFilter = ref("");
const columnVisibility = ref<VisibilityState>({})
const table = useVueTable({
  get data() {
    return props.data;
  },
  get columns() {
    return props.columns;
  },
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  onRowSelectionChange: (updaterOrValue) => valueUpdater(updaterOrValue, rowSelection),
  getFilteredRowModel: getFilteredRowModel(),
  onColumnVisibilityChange: updaterOrValue => valueUpdater(updaterOrValue, columnVisibility),
  initialState: {
    pagination: {
      pageIndex: 0,
      pageSize: 10,
    },
  },
  enableGlobalFilter: true,
  onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
  state: {
    get globalFilter() {
      return globalFilter.value;
    },
    get sorting() {
      return sorting.value;
    },
    get rowSelection() {
      return rowSelection.value;
    },
    get columnVisibility() { return columnVisibility.value },
  },
  onGlobalFilterChange: (updaterOrValue) => {
    globalFilter.value = typeof updaterOrValue === "function" ? updaterOrValue(globalFilter.value) : updaterOrValue;
  },
});

const handleDeleteSelected = () => {
  const { toast } = useToast();
  const selectedIds = table.getFilteredSelectedRowModel().rows.map((row) => row.original.id);

  if (!props.onDeleteSelected) return;

  props.onDeleteSelected(selectedIds);
  toast({
    title: "Items deleted",
    description: `Successfully deleted`,
    action: h(
      ToastAction,
      {
        altText: `deleted successfully`,
      },
      {
        default: () => "Continue",
      },
    ),
  });
  table.resetRowSelection()
};
</script>
<template>
  <div class="flex flex-col">
    <div class="flex items-center py-4">
      <Input :modelValue="globalFilter ?? ''" @update:modelValue="(value) => (globalFilter = String(value))" placeholder="Search all columns..." />
    </div>
    <div class="flex flex-col border-r-2 border-l-2 border-t-2 border-b-2 max-w-fit h-fit justify-center">
      <Table>
        <TableHeader>
          <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <TableHead class="text-white text-center" v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header" :props="header.getContext()" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <TableRow v-for="row in table.getRowModel().rows" :key="row.id" :data-state="row.getIsSelected() ? 'selected' : undefined">
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
              </TableCell>
            </TableRow>
          </template>
          <template v-else>
            <TableRow>
              <TableCell :colspan="columns.length" class="h-24 text-center"> No results. </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </div>
    <div class="flex flex-row justify-between">
      <div>
        <div class="text-white min-w-full align-center h-12 class= m-0 p-0">
          <ConfirmDialog asChild title="Are you sure ?" message="This action cannot be undone" @confirm="handleDeleteSelected">
            <Button v-if="table.getFilteredSelectedRowModel().rows.length > 0" type="button" class="mt-2 pl-[10px]"
              ><Trash2 :stroke-width="1.5"
            /></Button>
          </ConfirmDialog>
        </div>
      </div>
      <div class="flex items-center justify-end py-4 space-x-2">
        <Button type="button" text="Before" :disabled="!table.getCanPreviousPage()" @click="table.previousPage()" />
        <Button type="button" text="Next" :disabled="!table.getCanNextPage()" @click="table.nextPage()" />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
