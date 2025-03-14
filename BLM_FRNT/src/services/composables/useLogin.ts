import { ref } from "vue";
import { useRouter } from "vue-router";
import { blmApi } from "@/services/api";
import { useQueryClient } from "@tanstack/vue-query";
export default function useLogin() {
  const form = ref<{ username: string; password: string }>({
    username: "",
    password: "",
  });
  const errorMessage = ref<string>("");
  const router = useRouter();
  const queryClient = useQueryClient();

  async function handleSubmit() {
    try {
      await blmApi.login(form.value);
      const user = await blmApi.setCurrentUser();
      queryClient.setQueryData(["auth"], user);
      router.push("/back-office");
    } catch (error) {
      errorMessage.value = "Identifiants incorrects";
    }
  }

  return { form, errorMessage, handleSubmit };
}
