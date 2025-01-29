<script setup>
import { ref, onMounted } from 'vue';
import ky from 'ky';

const csrfToken = ref('');

const fetchCsrfToken = async () => {
  try {
    await ky.get('http://localhost:3333/api/auth/csrf-token', { credentials: 'include' });
    console.log('Cookie CSRF défini.');
  } catch (error) {
    console.error('Erreur lors de la récupération du token CSRF :', error);
  }
};

onMounted(fetchCsrfToken);

</script>

<template>
  <div style="display: none;"></div>
</template>
