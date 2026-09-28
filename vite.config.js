import { defineConfig } from "vite";

export default defineConfig({
  build: {
    // scripts/prerender.mjs reads the manifest to give each pre-rendered page
    // a preload for its route's code chunk (and then deletes it from dist/).
    manifest: true,
  },
});
