import { useQuery } from "@tanstack/vue-query";
import { blmApi } from "@blm/shared";

export function useAuth() {
  return useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const user = await blmApi.setCurrentUser();
      return user;
    },
  });
}
