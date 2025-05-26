import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
const repoName = "Tetris-Game";
export default defineConfig({
  plugins: [react()],
  base: `/${repoName}/`, // Replace with your repository name
  build: {
    outDir: "dist",
  },
});
