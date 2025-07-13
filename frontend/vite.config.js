import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import tailwindcss from "@tailwindcss/vite";

import { visualizer } from "rollup-plugin-visualizer";
export default defineConfig({
  plugins: [react(), tailwindcss(), visualizer({ open: true })],
  build: {
    chunkSizeWarningLimit: 1500, // increase limit to 1500kb (default is 500kb)
  },
});
