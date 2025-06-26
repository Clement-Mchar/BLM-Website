import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { blmApi } from '@blm/shared';
import type { Event, CreateEvent } from '@blm/shared/types'
import { computed } from "vue";

const eventKeys = {
  all: ["events"] as const,
  list: () => [...eventKeys.all, "list"] as const,
  detail: (id: string) => [...eventKeys.all, "detail", id] as const,

  create: () => [...eventKeys.all, "create"] as const,
  update: (id: string) => [...eventKeys.detail(id), "update"] as const,
  delete: (id: string) => [...eventKeys.detail(id), "delete"] as const,
};

export function useEvents() {
  return useQuery({
    queryKey: eventKeys.list(),
    queryFn: async () => {
      const events = await blmApi.getEvents();
      return events || [];
    },
  });
}

export function useCreateEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: eventKeys.create(),
    mutationFn: async (payload: CreateEvent) => {
      const event = await blmApi.createEvent(payload);
      return event;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: eventKeys.list() });
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: eventKeys.list() });
    },
  });
}

export function useDeleteEvent(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: computed(() => eventKeys.delete(id)),
    mutationFn: async (id: string) => {
      const event = await blmApi.getEventEdit(id);
      await blmApi.deleteEvent(event!.id);
      return event;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: eventKeys.list() });
    },
  });
}


export function useDeleteEvents() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: eventKeys.delete("abc123"),
    mutationFn: async (ids: string[]) => {
      return await blmApi.deleteEvents(ids);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: eventKeys.list() });
    },
  });
}
export function useEvent(id: string) {
  return useQuery({
    queryKey: computed(() => eventKeys.detail(id)),
    queryFn: async () => {
      const event = await blmApi.getEventEdit(id);
      return event;
    },
  });
}
export function useUpdateEvent(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: computed(() => eventKeys.update(id)),
    mutationFn: async ({ id, payload }: { id: string; payload: Partial<Event> }) => {
      return await blmApi.editEvent(id, payload);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: eventKeys.all });
    },
  });
}
