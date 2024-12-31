import { vitePreprocess } from "@sveltejs/vite-plugin-svelte"
import adapter from "svelte-adapter-bun"

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte"],
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: [vitePreprocess()],

  kit: {
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter(),
    version: {
      name: process.env.npm_package_version ?? "0.0.0",
    },
  },
}
export default config
