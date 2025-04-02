import { h } from "vue";
import type { User } from "@/interfaces/User";
import type { ColumnDef } from "@tanstack/vue-table";
import { ArrowUpDown } from "lucide-vue-next";
import DropdownAction from '@/components/DataTableDropDown.vue'
import { Button } from "@/components/ui/button";
export const columns: ColumnDef<User>[] = [
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
    accessorKey: "isAdmin",
    header: () => h("span", "Admin"),
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
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original

      return h('div', { class: 'relative' }, h(DropdownAction, {
        user,
      }))
    },
  }
];
