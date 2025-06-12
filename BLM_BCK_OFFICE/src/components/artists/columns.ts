import { h } from "vue";
import type { Artist } from "@/interfaces/Artist";
import type { ColumnDef } from "@tanstack/vue-table";
import { ArrowUpDown } from "lucide-vue-next";
import DropdownAction from "@/components/artists/ArtistDropDown.vue";
import { Button } from "@/components/ui/button";
import { Checkbox } from "../ui/checkbox";
export const columns: ColumnDef<Artist>[] = [
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
    accessorKey: "bio",
    header: () => h("span", "Bio"),
    cell: ({ row }) => {
      const bio = (row.getValue("bio") as string);
      if (typeof bio === "string") {
        return h("div", { class: "lowercase" }, bio.substring(0, 50) + "...");
      } else {
        return h("div", { class: "italic text-gray-400" }, "Aucune bio");
      }
    },
  },
  {
    accessorKey: "role",
    header: () => h("span", "Role"),
  },
  {
    accessorKey: "createdAt",
    header: () => h("span", "Created at"),
  },
  {
    accessorKey: "updatedAt",
    header: () => h("span", "Updated at"),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const artist = row.original;

      return h(
        "div",
        { class: "relative" },
        h(DropdownAction, {
          artist,
        }),
      );
    },
  },
];
