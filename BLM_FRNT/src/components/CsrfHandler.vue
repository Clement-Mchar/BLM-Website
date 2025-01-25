<script setup>
import { ref, onMounted } from 'vue';
import ky from 'ky';

// Variable pour stocker le token
const csrfToken = ref('');

// Fonction pour récupérer le token CSRF
const fetchCsrfToken = async () => {
  try {
    await ky.get('http://localhost:3333/auth/csrf-token', { credentials: 'include' });
    console.log('Cookie CSRF défini.');
  } catch (error) {
    console.error('Erreur lors de la récupération du token CSRF :', error);
  }
};

onMounted(fetchCsrfToken);

</script>

<template>
  <!-- Pas besoin d'affichage, logique uniquement -->
  <div style="display: none;"></div>
</template>
