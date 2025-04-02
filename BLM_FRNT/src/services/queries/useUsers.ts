import { useMutation, useQuery } from "@tanstack/vue-query";
import { blmApi } from "@/services/api";

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
    mutationFn: async (payload: {
      username: string;
      passwordConfirmation: { password: string; confirmPassword: string };
      role: string;
    }) => {
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
      return await blmApi.deleteUser(id)

    }
  })
}