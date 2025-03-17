import { h } from "vue";
import type { User } from "@/interfaces/User";
import type { ColumnDef } from "@tanstack/vue-table";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: () => h("span", "ID"),
  },
  {
    accessorKey: "username",
    header: () => h("span", "username"),
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
];
