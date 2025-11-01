// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import imagePaths from "./src/lib/remark-image-paths.js";
import remarkAddLayout from "./src/lib/remark-add-layout.js";

// https://astro.build/config
export default defineConfig({
  markdown: {
    shikiConfig: {
      wrap: true,
      themes: {
        light: 'github-light',
        dark: 'dracula',
      },
    },
    remarkPlugins: [remarkAddLayout,imagePaths],
  },
  vite: {
    plugins: [tailwindcss()],
  },
  site: "https://dccoder.com"
});