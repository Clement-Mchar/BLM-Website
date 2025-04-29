import { createApp } from "vue";
import "@/index.css";
import App from "@/App.vue";
import router from "@/router/index";
import { VueQueryPlugin, type VueQueryPluginOptions } from "@tanstack/vue-query";

const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: { queries: { staleTime: 360000, retry:true,  }, },
    
  },
  enableDevtoolsV6Plugin: true,
}
createApp(App)
  .use(router)
  .use(VueQueryPlugin, vueQueryPluginOptions)
  .mount("#app");
