import { ref } from "vue";
import { useRouter } from "vue-router";
import { blmApi } from "@blm/shared";
import { useQueryClient } from "@tanstack/vue-query";
import { useToast } from "@/components/ui/toast";
import { ToastAction } from "@/components/ui/toast";
import { h } from "vue";

export default function useLogin() {
  const form = ref<{ username: string; password: string }>({
    username: "",
    password: "",
  });
  const router = useRouter();
  const queryClient = useQueryClient();

  async function handleSubmit() {
    try {
      await blmApi.login(form.value);
      const user = await blmApi.setCurrentUser();
      queryClient.setQueryData(["auth"], user);
      router.push("/back-office");
    } catch (error) {
      if (error instanceof Error) {
        const { toast } = useToast();
        toast({
          title: "Erreur au moment du login",
          description: `Database error (${error.name})`,
          variant: "destructive",
          action: h(
            ToastAction,
            {
              altText: `Database error (${error.name})`,
            },
            {
              default: () => "Try again",
            },
          ),
        });
      }
    }
  }

  return { form, handleSubmit };
}
