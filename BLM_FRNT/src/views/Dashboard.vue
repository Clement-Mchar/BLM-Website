<template>
    <Layout>
        <CsrfHandler />
        <Navbar />
        <div class="flex justify-between flex-col items-center h-screen">
            <h1 class=" text-5xl mt-4">What do you want to manage ?</h1>
            <div class="flex flex-col min-h-160 min-w-screen items-center">
                <div class="flex flex-row justify-center w-screen h-full">
                    <DashboardTile text="USERS" link="/dashboard/users" customClass="border-r-2 border-b-2" />
                    <DashboardTile text="STAFF" link="/dashboard/staff" customClass="border-r-2 border-b-2" />
                    <DashboardTile text="ARTISTS" link="/dashboard/artists" customClass="border-b-2" />
                </div>
                <div class="flex flex-row justify-center w-screen h-full">
                    <DashboardTile text="POSTS" link="dashboard/posts" customClass="border-r-2" />
                    <DashboardTile text="ALBUMS" link="/albums" customClass="border-r-2" />
                    <DashboardTile text="EVENTS" link="/events" customClass="" />
                </div>
            </div>
            <div></div>
        </div>
    </Layout>
</template>

<script setup lang="ts">
import Layout from '@components/Layout.vue';
import CsrfHandler from '@components/CsrfHandler.vue';
import Navbar from '@components/Navbar.vue';
import DashboardTile from '@components/DashboardTile.vue';
</script>

<style scoped>
</style>