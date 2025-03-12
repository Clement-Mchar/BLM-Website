import { createApp } from 'vue'
import '@/index.css'
import App from '@/App.vue'
import router from '@/router/index';
import { VueQueryPlugin  } from '@tanstack/vue-query'

createApp(App)
  .use(router)
  .use(VueQueryPlugin, { enableDevtoolsV6Plugin: true})
  .mount('#app')