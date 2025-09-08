import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import ui from "@nuxt/ui/vite";
import path from "path";
// https://vite.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		ui({
			ui: {
				icons: {
					arrowLeft: "i-lucide-chevron-left",
					arrowRight: "i-lucide-chevron-right",
				},
				carousel: {
					slots: {
						root: "relative focus:outline-none",
						viewport: "overflow-hidden",
						container: "flex items-start",
						item: "min-w-0 shrink-0 basis-full",
						controls: "",
						arrows: "",
						prev: "absolute ring-0 bg-transparent text-accent-200 hover:ring-0 hover:border-0 hover:bg-transparent transition-none",
						next: "absolute ring-0 bg-transparent text-accent-200 hover:ring-0 hover:border-0 hover:bg-transparent transition-none",
						dots: "absolute inset-x-0 -bottom-7 flex flex-wrap items-center justify-center gap-3",
						dot: [
							"cursor-pointer size-3 bg-accented rounded-full",
							"transition",
						],
					},
					variants: {
						orientation: {
							vertical: {
								container: "flex-col -mt-4",
								item: "pt-4",
								prev: "top-4 sm:-top-12 left-1/2 -translate-x-1/2 rotate-90 rtl:-rotate-90",
								next: "bottom-4 sm:-bottom-12 left-1/2 -translate-x-1/2 rotate-90 rtl:-rotate-90",
							},
							horizontal: {
								container: "flex-row -ms-4",
								item: "ps-4",
								prev: "start-4 sm:-start-12 top-1/2 -translate-y-1/2",
								next: "end-4 sm:-end-12 top-1/2 -translate-y-1/2",
							},
						},
						active: {
							true: {
								dot: "data-[state=active]:bg-inverted",
							},
						},
					},
				},
			},
		}),
	],
	resolve: {
		alias: {
			"~": path.resolve(__dirname, "./src"),
			"@": path.resolve(__dirname, "src"),
			"@assets": path.resolve(__dirname, "./src/assets"),
			"@components": path.resolve(__dirname, "./src/components"),
			"@shared": path.resolve(__dirname, "../shared"),
		},
	},
});
