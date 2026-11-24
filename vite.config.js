import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],

    base: "/notes/",

    // Keep React and React DOM on one resolved module instance. This avoids
    // invalid-hook-call errors when Vite serves imports after the repo moves.
    resolve: {
        dedupe: ["react", "react-dom"],
    },
});
