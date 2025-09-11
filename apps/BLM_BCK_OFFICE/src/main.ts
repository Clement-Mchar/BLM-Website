import { createApp } from "vue";
import "@/index.css";
import App from "@/App.vue";
import router from "@/router/index";
import { VueQueryPlugin, type VueQueryPluginOptions } from "@tanstack/vue-query";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import * as Sentry from "@sentry/vue";
import { LaStrikethroughSolid } from "oh-vue-icons/icons";
const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: { queries: { staleTime: 360000, retry: true } },
  },
  enableDevtoolsV6Plugin: true,
};

addIcons(LaStrikethroughSolid);
const app = createApp(App).component("v-icon", OhVueIcon).use(router).use(VueQueryPlugin, vueQueryPluginOptions);
Sentry.init({
  app,
  dsn: import.meta.env.VITE_SENTRY_DSN,
  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/vue/configuration/options/#sendDefaultPii
  sendDefaultPii: true,
  integrations: [],
});
app.mount("#app");
