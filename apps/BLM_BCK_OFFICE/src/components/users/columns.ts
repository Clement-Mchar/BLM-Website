import { h } from "vue";
import type { User } from "@blm/shared";
import type { ColumnDef } from "@tanstack/vue-table";
import { ArrowUpDown } from "lucide-vue-next";
import DropdownAction from "@/components/users/UserDropDown.vue";
import { Button } from "@/components/ui/button";
import { Checkbox } from "../ui/checkbox";
export const columns: ColumnDef<User>[] = [
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
    accessorKey: "id",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => ["Id", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })],
      );
    },
    cell: ({ row }) => h("div", { class: "lowercase" }, row.getValue("id")),
    enableSorting: true,
  },

  {
    accessorKey: "username",
    header: () => h("span", "Username"),
  },
  {
    accessorKey: "userRole",
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
      const user = row.original;

      return h(
        "div",
        { class: "relative" },
        h(DropdownAction, {
          user,
        }),
      );
    },
  },
];
