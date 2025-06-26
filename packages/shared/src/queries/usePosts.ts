import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { blmApi } from "@blm/shared";
import type { Post, CreatePost } from "@blm/shared/types";
import { computed } from "vue";
const postKeys = {
	all: ["posts"] as const,
	list: () => [...postKeys.all, "list"] as const,
	detail: (id: string) => [...postKeys.all, "detail", id] as const,

	create: () => [...postKeys.all, "create"] as const,
	update: (id: string) => [...postKeys.detail(id), "update"] as const,
	delete: (id: string) => [...postKeys.detail(id), "delete"] as const,
};

export function usePosts() {
	return useQuery({
		queryKey: postKeys.list(),
		queryFn: async () => {
			const posts = await blmApi.getPosts();
			return posts || [];
		},
	});
}

export function useCreatePost() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: postKeys.create(),
		mutationFn: async (payload: CreatePost) => {
			const post = await blmApi.createPost(payload);
			return post;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: postKeys.list() });
		},
		onError: () => {
			queryClient.invalidateQueries({ queryKey: postKeys.list() });
		},
	});
}

export function useDeletePost(id: string) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: computed(() => postKeys.delete(id)),
		mutationFn: async (id: string) => {
			const post = await blmApi.getPostEdit(id);
			await blmApi.deletePost(post!.id);
			return post;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: postKeys.list() });
		},
	});
}

export function useDeletePosts() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: postKeys.delete("abc123"),
		mutationFn: async (ids: string[]) => {
			return await blmApi.deletePosts(ids);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: postKeys.list() });
		},
	});
}
export function usePost(id: string) {
	return useQuery({
		queryKey: computed(() => postKeys.detail(id)),
		queryFn: async () => {
			const post = await blmApi.getPostEdit(id);
			return post;
		},
	});
}
export function useUpdatePost(id: string) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: computed(() => postKeys.update(id)),
		mutationFn: async ({
			id,
			payload,
		}: {
			id: string;
			payload: Partial<Post>;
		}) => {
			return await blmApi.editPost(id, payload);
		},

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: postKeys.all });
		},
	});
}
export function useUpdatePostHeader(id: string) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: computed(() => postKeys.update(id)),
		mutationFn: async ({ id, payload }: { id: string; payload: FormData }) => {
			return await blmApi.editPostHeader(id, payload);
		},

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: postKeys.all });
		},
	});
}
