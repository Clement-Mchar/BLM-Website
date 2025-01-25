<template>
    <div class="min-h-screen bg-black w-full flex flex-col">
      <div class="flex flex-col min-h-96 items-center">
        <div class="flex items-start">
          <h1 class="text-[180px] font-resolve mb-5  text-white max-h-52">•BLM•</h1>
        </div>
        <div class="flex flex-col min-w-[40rem] min-h-[18rem] justify-between border-white border-solid border-2 p-3">
          <CsrfHandler />
          <form class="min-h-86" @submit.prevent="onSubmit">
            <div class="mb-4">
              <label for="fullName" class="block text-sm font-medium text-white">Pseudo</label>
              <input
                id="fullName"
                type="fullName"
                v-model="fullName"
                required
                class="mt-1 block h-10 w-full p-2 bg-slate-300 focus:border rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
            <div class="mb-4">
              <label for="password" class=" mt-8 block text-sm font-medium text-white">Mot de passe</label>
              <input
                id="password"
                type="password"
                v-model="password"
                required
                class="mt-1 block w-full  p-2 bg-slate-300 focus:border rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                autocomplete="new-password"
              />
            </div>
            <div class="flex flex-row justify-between">
              <div></div>
              <button
              type="submit"
              class="w-32 mt-6 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-indigo-200">
              Go
              </button>
              <div></div>
            </div>

          </form>
          <div v-if="successMessage" class="text-green-500">
            {{ successMessage }}
          </div>
          <div v-if="errorMessage" class="text-red-500">
            {{ errorMessage }}
          </div>
        </div>
      </div>
    </div>
  </template>

<script setup >
  import { ref } from 'vue';
  import ky from 'ky';
  import CsrfHandler from '../components/CsrfHandler.vue';
  import { api } from '../services/api';

  const fullName = ref('');
  const password = ref('');
  const errorMessage = ref('');
  const successMessage = ref('');

  const onSubmit = async () => {
      try {
        
        const response = await api.post('http://localhost:3333/login', {
          json: {
            fullName: fullName.value,
            password: password.value,
          },
          credentials: 'include'

        }).json();
        successMessage.value = 'Connexion réussie'
      }
        
      catch (error) {
      if (error.response) {
        errorMessage.value = 'Identifiants incorrects';
      } else {
        errorMessage.value = console.log('wow');
      }
      successMessage.value = '';
    }
}
</script>
  
<style scoped>
</style>