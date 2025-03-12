<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
</script>

<template>
  <router-view />
  <VueQueryDevtools/>
</template>

<style scoped>
/* Ajoute des styles globaux ici si besoin */
</style>