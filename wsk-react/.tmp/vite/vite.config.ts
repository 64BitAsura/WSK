import { defineConfig, searchForWorkspaceRoot } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      server: {
        fs: {
          allow: [
            searchForWorkspaceRoot(process.cwd()),
            "..",
            "../..",
            "../../..",
            "/wsk-stencil/wsk-app/packages/",
            "/Users/hikumealan/Code/WSK/wsk-stencil/wsk-app/packages/stencil-library/dist/",
          ],
        },
      },
    }),
  ],
});
