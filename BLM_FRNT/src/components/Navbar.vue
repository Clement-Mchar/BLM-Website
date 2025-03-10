<template>
    <CsrfHandler />
        <div class=" flex flex-row justify-between items-center p-w-screen border-b-white border-solid border-b-2 pb-2">
            <h2 class="text-[26px] pl-1">User : {{ auth?.username }}</h2>
            <RouterLink to="/dashboard" class=" text-4xl text-center hover:bg-gray-700 rounded-lg p-2">BACK-OFFICE</RouterLink>
            <Button className="w-32 mt-1 mr-1 bg-gray-900 cursor-pointer text-white py-2 px-4 rounded-lg hover:bg-gray-700 text-2xl focus:outline-hidden focus:ring-3 focus:ring-indigo-200 self-center" @click="logout" text="Log out"/>
        </div>
</template>

<script setup lang="ts">
import Button from '~/components/Button.vue';
import CsrfHandler from './CsrfHandler.vue';
import { RouterLink } from 'vue-router';
import { useLogout } from '../services/composables/useLogout';
import { useAuth } from '../services/queries/users'
const { data: auth} = useAuth();
const { mutate: logout } = useLogout();
</script>

<style scoped>
/* Style de ton dashboard */
</style>