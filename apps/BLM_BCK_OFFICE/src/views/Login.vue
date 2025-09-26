<template>
  <Layout>
    <div class="flex min-h-svh flex-col items-center">
      <div class="flex items-start">
        <h1 class="text-[180px] font-resolve mb-5 text-white max-h-52">
          •BLM•
        </h1>
      </div>
      <div class="flex flex-col min-w-200 min-h-100 justify-between border-white border-solid border-2 p-3">
        <CsrfHandler />
        <LoginForm />
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { useToast } from "@/components/ui/toast";
import CsrfHandler from "@components/CsrfHandler.vue";
import Layout from "@components/Layout.vue";
import LoginForm from "@components/LoginForm.vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const { toast } = useToast();

onMounted(() => {
  if (route.query.loggedOut === "true") {
    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté avec succès.",
    });
  }
});
</script>

<style scoped></style>
