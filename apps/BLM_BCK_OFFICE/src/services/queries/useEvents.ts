import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { blmApi } from "@/services/api";
import type { Event, CreateEvent } from "../../interfaces/Event";
import { h, computed } from "vue";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/toast/use-toast";

const { toast } = useToast();
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
    onSuccess: (event) => {
      queryClient.invalidateQueries({ queryKey: eventKeys.list() });
      toast({
        title: "Event created",
        description: `Event ${event?.name} created`,
        action: h(
          ToastAction,
          {
            altText: `Event created`,
          },
          {
            default: () => "Continue",
          },
        ),
      });
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
    onSuccess: (event) => {
      queryClient.invalidateQueries({ queryKey: eventKeys.list() });
      toast({
        title: "Event deleted",
        description: `${event?.name} deleted from database.`,
        action: h(
          ToastAction,
          {
            altText: `Event deleted`,
          },
          {
            default: () => "Continue",
          },
        ),
      });
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
