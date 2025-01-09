<template>
    <div class="min-h-screen bg-black w-full flex flex-col">
      <div class="flex flex-col min-h-96 items-center">
        <div class="flex items-start">
          <h1 class="text-[180px] font-resolve mb-5  text-white max-h-52">•BLM•</h1>
        </div>
        <div class="flex flex-col min-w-[40rem] min-h-[18rem] justify-between border-white border-solid border-2 p-3">
          <form class="min-h-86" @submit.prevent="onSubmit">
            <div class="mb-4">
              <label for="email" class="block text-sm font-medium text-white">Email</label>
              <input
                id="email"
                type="email"
                v-model="email"
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
        </div>
      </div>
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      onSubmit() {
        // Logic to handle the form submission will be added here
      },
    },
  };
  </script>
  
  <style scoped>
  /* Ajoute des styles spécifiques si nécessaire */
  </style>