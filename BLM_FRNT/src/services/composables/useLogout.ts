import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { blmApi } from "@/services/api";
import router from "@/router";

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await blmApi.logout();
    },
    onSuccess: () => {
      queryClient.setQueryData(["auth"], null);
      router.push({ name: "login", query: { loggedOut: "true" } });
    },
  });
}
