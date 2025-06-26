import { h } from "vue";
import type { Post } from "@blm/shared";
import type { ColumnDef } from "@tanstack/vue-table";
import { ArrowUpDown } from "lucide-vue-next";
import DropdownAction from "@/components/posts/PostDropDown.vue";
import { Button } from "@/components/ui/button";
import { Checkbox } from "../ui/checkbox";
export const columns: ColumnDef<Post>[] = [
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
    accessorKey: "title",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => ["Title", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })],
      );
    },
    cell: ({ row }) => h("div", { class: "lowercase" }, row.getValue("title")),
    enableSorting: true,
  },
  {
    accessorKey: "user",
    header: () => h("span", "Author"),
    cell: ({ row }) => {
      const user = row.getValue("user") as { id: number; username: string } | null;
      return h("span", user?.username ?? "—");
    },
  },
  {
    accessorKey: "category",
    header: () => h("span", "category"),
  },
  {
    accessorKey: "artists",
    header: () => h("span", "Related Artists"),
    cell: ({ row }) => {
      const artists = row.getValue("artists") as { id: string; name: string }[];
      return h("span", artists.map((artist) => artist.name).join(", "));
    },
  },
  {
    accessorKey: "albums",
    header: () => h("span", "Related Albums"),
    cell: ({ row }) => {
      const albums = row.getValue("albums") as { id: string; name: string }[];
      return h("span", albums.map((album) => album.name).join(", "));
    },
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
      const post = row.original;

      return h(
        "div",
        { class: "relative" },
        h(DropdownAction, {
          post,
        }),
      );
    },
  },
];
