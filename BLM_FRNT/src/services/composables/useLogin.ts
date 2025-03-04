import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { blmApi } from '@/services/api';

export default function useLogin() {
  const form = ref<{ username: string; password: string }>({ username: '', password: '' });
  const errorMessage = ref<string>('');
  const router = useRouter();

  async function handleSubmit() {
    try {
      await blmApi.login(form.value);
      router.push('/dashboard')
    } catch (error) {
      errorMessage.value = 'Identifiants incorrects';
    }
  }

  return { form, errorMessage, handleSubmit };
}
