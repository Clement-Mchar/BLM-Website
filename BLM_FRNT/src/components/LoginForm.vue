<template>
<form class="min-h-40" @submit.prevent="handleSubmit">
  <div class="mb-4">
    <label
      for="username"
      class="block text-3xl pb-2 font-medium text-white"
      >Pseudo</label
    >
    <input
      id="username"
      type="text"
      v-model="form.username"
      required
      class="mt-1 block w-full h-16 p-2 text-2xl text-black bg-slate-300 focus:border rounded-lg shadow-xs focus:outline-hidden focus:ring-indigo-500 focus:border-indigo-500"
      aria-label="nom d'utilisateur"
      autocomplete="username"
    />
    <label
      for="password"
      class="mt-8 pb-2 block text-3xl font-medium text-white"
      >Mot de passe</label
    >
    <input
      id="password"
      type="password"
      v-model="form.password"
      required
      class="mt-1 block w-full h-16 p-2 text-2xl bg-slate-300 focus:border text-black rounded-lg shadow-xs focus:outline-hidden focus:ring-indigo-500 focus:border-indigo-500"
      autocomplete="new-password"
    />
  </div>
  <div class="flex flex-row justify-between">
    <div></div>
    <Button
      class=" text-center w-60 mt-1 h-26 text-5xl bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-700 focus:outline-hidden focus:ring-3 focus:ring-indigo-200"
      @click="handleSubmit"
      text="Go"
      type="submit"
    />
    <div></div>
  </div>
</form>
</template>

<script setup lang="ts">
import useLogin from "@/services/composables/useLogin";
import Button from "@components/Button.vue";

const { form, handleSubmit } = useLogin();
</script>