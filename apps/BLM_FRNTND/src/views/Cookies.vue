<template>
  <div v-if="showBanner" class="fixed bottom-0 w-full bg-gray-800 text-white p-4 flex justify-between items-center z-50">
    <span>Nous utilisons des cookies pour améliorer votre expérience et analyser le trafic. Vous pouvez accepter ou refuser.</span>
    <div class="flex gap-2">
      <button @click="acceptCookies" class="px-4 py-2 bg-green-500 rounded">Accepter</button>
      <button @click="refuseCookies" class="px-4 py-2 bg-red-500 rounded">Refuser</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const showBanner = ref(false);

onMounted(() => {
  const stored = localStorage.getItem("cookiesAccepted");
  if (stored === null) {
    showBanner.value = true;
  }
});

function acceptCookies() {
  localStorage.setItem("cookiesAccepted", "true");
  showBanner.value = false;
  window.dispatchEvent(new Event("cookies-accepted"));
}

function refuseCookies() {
  localStorage.setItem("cookiesAccepted", "false");
  showBanner.value = false;
}
</script>

<style scoped>
</style>
