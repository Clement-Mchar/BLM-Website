import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { blmApi } from '@blm/shared';
import type { Album, CreateAlbum } from '@blm/shared/types'
import { computed } from "vue";


const albumKeys = {
  all: ["albums"] as const,
  list: () => [...albumKeys.all, "list"] as const,
  detail: (id: string) => [...albumKeys.all, "detail", id] as const,

  create: () => [...albumKeys.all, "create"] as const,
  update: (id: string) => [...albumKeys.detail(id), "update"] as const,
  delete: (id: string) => [...albumKeys.detail(id), "delete"] as const,
};

export function useAlbums() {
  return useQuery({
    queryKey: albumKeys.list(),
    queryFn: async () => {
      const albums = await blmApi.getAlbums();
      return albums || [];
    },
  });
}

export function useCreateAlbum() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: albumKeys.create(),
    mutationFn: async (payload: CreateAlbum) => {
      const album = await blmApi.createAlbum(payload);
      return album;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: albumKeys.list() });
      
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: albumKeys.list() });
    },
  });
}

export function useDeleteAlbum(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: computed(() => albumKeys.delete(id)),
    mutationFn: async (id: string) => {
      const album = await blmApi.getAlbumEdit(id);
      await blmApi.deleteAlbum(album!.id);
      return album;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: albumKeys.list() });

    },
  });
}

export function useDeleteAlbums() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: albumKeys.delete("abc123"),
    mutationFn: async (ids: string[]) => {
      return await blmApi.deleteAlbums(ids);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: albumKeys.list() });
    },
  });
}
export function useAlbum(id: string) {
  return useQuery({
    queryKey: computed(() => albumKeys.detail(id)),
    queryFn: async () => {
      const album = await blmApi.getAlbumEdit(id);
      return album;
    },
  });
}
export function useUpdateAlbum(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: computed(() => albumKeys.update(id)),
    mutationFn: async ({ id, payload }: { id: string; payload: Partial<Album> }) => {
      return await blmApi.editAlbum(id, payload);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: albumKeys.all });
    },
  });
}
export function useUpdateAlbumCover(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: computed(() => albumKeys.update(id)),
    mutationFn: async ({ id, payload }: { id: string; payload: FormData }) => {
      return await blmApi.editAlbumCover(id, payload);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: albumKeys.all });
    },
  });
}
