import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteEnvs } from "vite-envs";
import tsconfigPaths from "vite-tsconfig-paths";

import { version } from "./package.json";

// Import the version from package.json

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tsconfigPaths(),
        viteEnvs({
            declarationFile: ".env"
        })
    ],
    define: { __APP_VERSION__: JSON.stringify(version) }
});
