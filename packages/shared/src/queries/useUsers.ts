import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { blmApi } from '@blm/shared';
import type { ConfirmUserPayload, CreateUserPayload, User } from '@blm/shared/types'
import { computed } from "vue";
const userKeys = {
  all: ["users"] as const,
  list: () => [...userKeys.all, "list"] as const,
  detail: (id: number) => [...userKeys.all, "detail", id] as const,

  create: () => [...userKeys.all, "create"] as const,
  update: (id: number) => [...userKeys.detail(id), "update"] as const,
  delete: (id: number) => [...userKeys.detail(id), "delete"] as const,
};

export function useUsers() {
  return useQuery({
    queryKey: userKeys.list(),
    queryFn: async () => {
      const users = await blmApi.getUsers();
      return users || [];
    },
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: userKeys.create(),
    mutationFn: async (payload: CreateUserPayload) => {
      const { username, passwordConfirmation, userRole } = payload;

      const userData: ConfirmUserPayload = {
        username,
        password: passwordConfirmation.password,
        password_confirmation: passwordConfirmation.password,
        userRole,
      };

      const user = await blmApi.createUser(userData);
      return user;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.list() });
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.list() });
    },
  });
}

export function useDeleteUser(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: computed(() => userKeys.delete(id)),
    mutationFn: async (id: number) => {
      const user = await blmApi.getUserEdit(id);
      await blmApi.deleteUser(user!.id);
      return user;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.list() }); 
    },
  });
}
export function useDeleteUsers() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: userKeys.delete(0),
    mutationFn: async (ids: number[]) => {
      return await blmApi.deleteUsers(ids);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.list() });
    },
  });
}
export function useUserToEdit(id: number) {
  return useQuery({
    queryKey: computed(() => userKeys.detail(id)),
    queryFn: async () => {
      const user = await blmApi.getUserEdit(id);
      return user;
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
}
export function useUser(id: number) {
  return useQuery({
    queryKey: computed(() => userKeys.detail(id)),
    queryFn: async () => {
      const user = await blmApi.getUser(id);
      return user;
    }
  });
}
export function useUpdateUser(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: computed(() => userKeys.update(id)),
    mutationFn: async ({ id, payload }: { id: number; payload: Partial<User> }) => {
      return await blmApi.editUser(id, payload);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
    },

  });
}
