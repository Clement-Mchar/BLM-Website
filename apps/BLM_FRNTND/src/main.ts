import { createApp } from "vue";
import "./style.css";
import ui from "@nuxt/ui/vue-plugin";
import * as Sentry from "@sentry/vue";

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
const app = createApp(App)
	.use(router)
	.use(ui)
	.use(VueQueryPlugin, vueQueryPluginOptions);
window.addEventListener("cookies-accepted", () => {
	Sentry.init({
		app,
		dsn: import.meta.env.VITE_SENTRY_DSN,
		// Adds request headers and IP for users, for more info visit:
		// https://docs.sentry.io/platforms/javascript/guides/vue/configuration/options/#sendDefaultPii
		sendDefaultPii: true,
		integrations: [],
	});
});

app.mount("#app");
