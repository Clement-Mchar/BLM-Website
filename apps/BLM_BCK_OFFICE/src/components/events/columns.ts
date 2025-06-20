import { h } from "vue";
import type { Event } from "../../../../../shared/interfaces/Event";
import type { ColumnDef } from "@tanstack/vue-table";
import { ArrowUpDown } from "lucide-vue-next";
import DropdownAction from "@/components/events/EventDropDown.vue";
import { Button } from "@/components/ui/button";
import { Checkbox } from "../ui/checkbox";
export const columns: ColumnDef<Event>[] = [
  {
    id: "select",
    header: ({ table }) =>
      h(Checkbox, {
        modelValue: table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate"),
        "onUpdate:modelValue": (value) => table.toggleAllPageRowsSelected(!!value),
        ariaLabel: "Select all",
      }),
    cell: ({ row }) =>
      h(Checkbox, {
        modelValue: row.getIsSelected(),
        "onUpdate:modelValue": (value) => row.toggleSelected(!!value),
        ariaLabel: "Select row",
      }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => ["Name", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })],
      );
    },
    cell: ({ row }) => h("div", { class: "lowercase" }, row.getValue("name")),
    enableSorting: true,
  },
  {
    accessorKey: "description",
    header: () => h("span", "Description"),
  },
  {
    accessorKey: "location",
    header: () => h("span", "Location"),
  },
  {
    accessorKey: "reservation",
    header: () => h("span", "Reservation"),
  },
  {
    accessorKey: "date",
    header: () => h("span", "Date"),
  },

  {
    accessorKey: "artists",
    header: () => h("span", "Artists"),
    cell: ({ row }) => {
      const artists = row.getValue("artists") as { id: string; name: string }[];
      return h("span", artists.map((artist) => artist.name).join(", "));
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const event = row.original;

      return h(
        "div",
        { class: "relative" },
        h(DropdownAction, {
          event,
        }),
      );
    },
  },
];
