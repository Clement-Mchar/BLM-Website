import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { blmApi } from "@/services/api";
import type { Artist, CreateArtist } from "../../interfaces/Artist";
import { h, computed } from "vue";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/toast/use-toast";

const { toast } = useToast();
const artistKeys = {
  all: ["artists"] as const,
  list: () => [...artistKeys.all, "list"] as const,
  detail: (id: string) => [...artistKeys.all, "detail", id] as const,

  create: () => [...artistKeys.all, "create"] as const,
  update: (id: string) => [...artistKeys.detail(id), "update"] as const,
  delete: (id: string) => [...artistKeys.detail(id), "delete"] as const,
};

export function useArtists() {
  return useQuery({
    queryKey: artistKeys.list(),
    queryFn: async () => {
      const artists = await blmApi.getArtists();
      return artists || [];
    },
  });
}

export function useCreateArtist() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: artistKeys.create(),
    mutationFn: async (payload: CreateArtist) => {
      const artist = await blmApi.createArtist(payload);
      return artist;
    },
    onSuccess: (artist) => {
      queryClient.invalidateQueries({ queryKey: artistKeys.list() });
      toast({
        title: "Artist created",
        description: `Artist ${artist?.name} created`,
        action: h(
          ToastAction,
          {
            altText: `Artist created`,
          },
          {
            default: () => "Continue",
          },
        ),
      });
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: artistKeys.list() });
    },
  });
}

export function useDeleteArtist(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: computed(() => artistKeys.delete(id)),
    mutationFn: async (id: string) => {
      const artist = await blmApi.getArtistEdit(id);
      await blmApi.deleteArtist(artist!.id);
      return artist;
    },
    onSuccess: (artist) => {
      queryClient.invalidateQueries({ queryKey: artistKeys.list() });
      toast({
        title: "Artist deleted",
        description: `${artist?.name} deleted from database.`,
        action: h(
          ToastAction,
          {
            altText: `Artist deleted`,
          },
          {
            default: () => "Continue",
          },
        ),
      });
    },
  });
}

export function useDeleteArtists() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: artistKeys.delete("abc123"),
    mutationFn: async (ids: string[]) => {
      return await blmApi.deleteArtists(ids);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: artistKeys.list() });
    },
  });
}
export function useArtist(id: string) {
  return useQuery({
    queryKey: computed(() => artistKeys.detail(id)),
    queryFn: async () => {
      const artist = await blmApi.getArtistEdit(id);
      return artist;
    },
  });
}
export function useUpdateArtist(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: computed(() => artistKeys.update(id)),
    mutationFn: async ({ id, payload }: { id: string; payload: Partial<Artist> }) => {
      return await blmApi.editArtist(id, payload);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: artistKeys.all });
    },
  });
}
export function useUpdateArtistAvatar(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: computed(() => artistKeys.update(id)),
    mutationFn: async ({ id, payload }: { id: string; payload: FormData }) => {
      return await blmApi.editArtistAvatar(id, payload);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: artistKeys.all });
    },
  });
}
