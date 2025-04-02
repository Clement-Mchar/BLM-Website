<template>
  <Layout>
    <div class="flex flex-col min-h-96 items-center">
      <div class="flex items-start">
        <h1 class="text-[180px] font-resolve mb-5 text-white max-h-52">
          •BLM•
        </h1>
      </div>
      <div class="flex flex-col min-w-[50rem] min-h-[25rem] justify-between border-white border-solid border-2 p-3">
        <CsrfHandler />
        <LoginForm />
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import CsrfHandler from "@components/CsrfHandler.vue";
import Layout from "@components/Layout.vue";
import LoginForm from "@components/LoginForm.vue";
</script>

<style scoped></style>
