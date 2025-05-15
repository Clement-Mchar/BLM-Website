import { useQuery } from "@tanstack/vue-query";
import { blmApi } from "@/services/api";

export function useAlbums() {
    return useQuery({
        queryKey: ["albums"],
        queryFn: async() => {
            const users = await blmApi.getAlbums();
            return users || [];
        },
        staleTime: 1000 * 60 * 5,
    })
    }