import { skeleton } from "@skeletonlabs/tw-plugin"
import forms from "@tailwindcss/forms"
import typography from "@tailwindcss/typography"
import { join } from "path"
import type { Config } from "tailwindcss"

import { md2 } from "./src/md2"

export default {
  darkMode: "class",
  content: ["./src/**/*.{html,js,svelte,ts}", join(require.resolve("@skeletonlabs/skeleton"), "../**/*.{html,js,svelte,ts}")],
  theme: {
    extend: {},
  },
  plugins: [
    forms,
    typography,
    skeleton({
      themes: {
        custom: [md2],
      },
    }),
  ],
} satisfies Config
