<script setup lang="ts">
import { VueQueryDevtools } from "@tanstack/vue-query-devtools";
import Toaster from "@/components/ui/toast/Toaster.vue";
</script>

<template>
  <Toaster />
  <router-view />
  <VueQueryDevtools />
</template>

<style scoped>
/* Ajoute des styles globaux ici si besoin */
</style>
