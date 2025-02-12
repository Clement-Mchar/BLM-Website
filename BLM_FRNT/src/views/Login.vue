<template>
    <div class="min-h-screen bg-black w-full flex flex-col">
      <div class="flex flex-col min-h-96 items-center">
        <div class="flex items-start">
          <h1 class="text-[180px] font-resolve mb-5  text-white max-h-52">•BLM•</h1>
        </div>
        <div class="flex flex-col min-w-[40rem] min-h-[18rem] justify-between border-white border-solid border-2 p-3">
          <CsrfHandler />
<<<<<<< HEAD
          <form class="min-h-40" @submit.prevent="handleSubmit">
=======
          <form class="min-h-86" @submit.prevent="handleSubmit">
>>>>>>> 6bef9b5aefbf296d713b8c474db37d5565295330
            <div class="mb-4">
              <label for="username" class="block text-sm font-medium text-white">Pseudo</label>
              <input
                id="username"
                type="username"
                v-model="form.username"
                required
<<<<<<< HEAD
                class="mt-1 block h-10 w-full p-2 bg-slate-300 focus:border rounded-lg shadow-xs focus:outline-hidden focus:ring-indigo-500 focus:border-indigo-500"
=======
                class="mt-1 block h-10 w-full p-2 bg-slate-300 focus:border rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
>>>>>>> 6bef9b5aefbf296d713b8c474db37d5565295330
                />
            </div>
            <div class="mb-4">
              <label for="password" class=" mt-8 block text-sm font-medium text-white">Mot de passe</label>
              <input
                id="password"
                type="password"
                v-model="form.password"
                required
<<<<<<< HEAD
                class="mt-1 block w-full  p-2 bg-slate-300 focus:border rounded-lg shadow-xs focus:outline-hidden focus:ring-indigo-500 focus:border-indigo-500"
=======
                class="mt-1 block w-full  p-2 bg-slate-300 focus:border rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
>>>>>>> 6bef9b5aefbf296d713b8c474db37d5565295330
                autocomplete="new-password"
              />
            </div>
            <div class="flex flex-row justify-between">
              <div></div>
              <button
              type="submit"
<<<<<<< HEAD
              class="w-32 mt-6 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-700 focus:outline-hidden focus:ring-3 focus:ring-indigo-200">
=======
              class="w-32 mt-6 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-indigo-200">
>>>>>>> 6bef9b5aefbf296d713b8c474db37d5565295330
              Go
              </button>
              <div></div>
            </div>

          </form>
          <div v-if="errorMessage" class="text-red-500">
            {{ errorMessage }}
          </div>
        </div>
      </div>
    </div>
  </template>

<script setup lang="ts">
  import CsrfHandler from '~/components/CsrfHandler.vue';
  import { useLogin } from '../composables/useLogin';

  const { form, errorMessage, handleSubmit } = useLogin();
</script>
  
<style scoped>
</style>