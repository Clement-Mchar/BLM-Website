import { useQuery } from "@tanstack/vue-query";
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
