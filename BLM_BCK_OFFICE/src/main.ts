import { createApp } from "vue";
import "@/index.css";
import App from "@/App.vue";
import router from "@/router/index";
import { VueQueryPlugin, type VueQueryPluginOptions } from "@tanstack/vue-query";
import { OhVueIcon, addIcons } from "oh-vue-icons";

import { LaStrikethroughSolid } from "oh-vue-icons/icons";
const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: { queries: { staleTime: 360000, retry: true } },
  },
  enableDevtoolsV6Plugin: true,
};
addIcons(LaStrikethroughSolid);
createApp(App).component("v-icon", OhVueIcon).use(router).use(VueQueryPlugin, vueQueryPluginOptions).mount("#app");
