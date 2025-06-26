import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { blmApi } from "@blm/shared";
import type { CreateVideo, Video } from "@blm/shared/types";
import { computed } from "vue";

const videoKeys = {
	all: ["videos"] as const,
	list: () => [...videoKeys.all, "list"] as const,
	detail: (id: string) => [...videoKeys.all, "detail", id] as const,

	create: () => [...videoKeys.all, "create"] as const,
	update: (id: string) => [...videoKeys.detail(id), "update"] as const,
	delete: (id: string) => [...videoKeys.detail(id), "delete"] as const,
};

export function useVideos() {
	return useQuery({
		queryKey: videoKeys.list(),
		queryFn: async () => {
			const videos = await blmApi.getVideos();
			return videos || [];
		},
	});
}

export function useCreateVideo() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: videoKeys.create(),
		mutationFn: async (payload: CreateVideo) => {
			const video = await blmApi.createVideo(payload);
			return video;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: videoKeys.list() });
		},
		onError: () => {
			queryClient.invalidateQueries({ queryKey: videoKeys.list() });
		},
	});
}

export function useDeleteVideo(id: string) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: computed(() => videoKeys.delete(id)),
		mutationFn: async (id: string) => {
			const video = await blmApi.getVideoEdit(id);
			await blmApi.deleteVideo(video!.id);
			return video;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: videoKeys.list() });
		},
	});
}
export function useDeleteVideos() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: videoKeys.delete("abc123"),
		mutationFn: async (ids: string[]) => {
			return await blmApi.deleteVideos(ids);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: videoKeys.list() });
		},
	});
}
export function useVideoToEdit(id: string) {
	return useQuery({
		queryKey: computed(() => videoKeys.detail(id)),
		queryFn: async () => {
			const video = await blmApi.getVideoEdit(id);
			return video;
		},
		retry: false,
		staleTime: 1000 * 60 * 5,
	});
}
export function useVideo(id: string) {
	return useQuery({
		queryKey: computed(() => videoKeys.detail(id)),
		queryFn: async () => {
			const video = await blmApi.getVideo(id);
			return video;
		},
	});
}
export function useUpdateVideo(id: string) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: computed(() => videoKeys.update(id)),
		mutationFn: async ({
			id,
			payload,
		}: {
			id: string;
			payload: Partial<Video>;
		}) => {
			return await blmApi.editVideo(id, payload);
		},

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: videoKeys.all });
		},
	});
}
