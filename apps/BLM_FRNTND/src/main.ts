import { createApp } from "vue";
import {
	VueQueryPlugin,
	type VueQueryPluginOptions,
} from "@tanstack/vue-query";
import "./style.css";
import App from "./App.vue";
import router from "./router/index";
const vueQueryPluginOptions: VueQueryPluginOptions = {
	queryClientConfig: {
		defaultOptions: { queries: { staleTime: 360000, retry: true } },
	},
	enableDevtoolsV6Plugin: true,
};
createApp(App)
	.use(router)
	.use(VueQueryPlugin, vueQueryPluginOptions)
	.mount("#app");
