import { ref } from 'vue';
import { blmApi } from '../lib/api';

export function useLogin() {
  const form = ref<{ username: string; password: string }>({ username: '', password: '' });
  const errorMessage = ref<string>('');
  const successMessage = ref<string>('');

  async function handleSubmit(): Promise<void> {
    try {
      await blmApi.login(form.value);
      successMessage.value = 'Connexion réussie';
      errorMessage.value = '';
    } catch (error) {
      errorMessage.value = 'Identifiants incorrects';
      successMessage.value = '';
    }
  }

  return { form, errorMessage, successMessage, handleSubmit };
}
