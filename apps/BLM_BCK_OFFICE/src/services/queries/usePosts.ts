import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { blmApi } from "@/services/api";
import type { /*Post,*/ Post, CreatePost } from "../../interfaces/Post";
import { h, computed } from "vue";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/toast/use-toast";

const { toast } = useToast();
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
    onSuccess: (post) => {
      queryClient.invalidateQueries({ queryKey: postKeys.list() });
      toast({
        title: "Post created",
        description: `Post ${post?.title} created`,
        action: h(
          ToastAction,
          {
            altText: `Post created`,
          },
          {
            default: () => "Continue",
          },
        ),
      });
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
    onSuccess: (post) => {
      queryClient.invalidateQueries({ queryKey: postKeys.list() });
      toast({
        title: "Post deleted",
        description: `${post?.title} deleted from database.`,
        action: h(
          ToastAction,
          {
            altText: `Post deleted`,
          },
          {
            default: () => "Continue",
          },
        ),
      });
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
    mutationFn: async ({ id, payload }: { id: string; payload: Partial<Post> }) => {
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
