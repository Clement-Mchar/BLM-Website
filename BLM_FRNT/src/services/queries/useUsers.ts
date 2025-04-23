import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { blmApi } from "@/services/api";
import type { User } from "@/interfaces/User";
import { computed } from "vue";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const users = await blmApi.getUsers();
      return users || [];
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
}

export function useCreateUser() {
  return useMutation({
    mutationFn: async (payload: { username: string; passwordConfirmation: { password: string; confirmPassword: string }; role: string }) => {
      const { username, passwordConfirmation, role } = payload;

      const userData = {
        username,
        password: passwordConfirmation.password,
        password_confirmation: passwordConfirmation.password,
        role,
      };

      const user = await blmApi.createUser(userData);
      return user;
    },
    onSuccess: () => {
      console.log("Utilisateur créé avec succès !");
    },
    onError: (error) => {
      console.error("Erreur de création d'utilisateur :", error);
    },
  });
}

export function useDeleteUser() {
  return useMutation({
    mutationFn: async (id: number) => {
      return await blmApi.deleteUser(id);
    },
  });
}
export function useUser(id: number) {
  return useQuery({
    queryKey: computed(() => ["user", id]),
    queryFn: async () => {
      const user = await blmApi.getUserEdit(id);
      return user;
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
}
export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }: { id: number; payload: Partial<User> }) => {
      return await blmApi.editUser(id, payload);
    },

    onMutate: async ({ id, payload }) => {
      const previousUser = queryClient.getQueryData<User>(["user", id]);
      await queryClient.cancelQueries({ queryKey: ["user", id] });

      

      queryClient.setQueryData(["user", id], {
        ...previousUser,
        ...payload,
      });

      return { previousUser };
    },

    onError: (_err, variables, context) => {
      if (context?.previousUser) {
        queryClient.setQueryData(["user", variables.id], context.previousUser);
      }
      console.error("Update failed", _err);
    },

    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({ queryKey: ["user", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
