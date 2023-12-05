import { defineConfig, searchForWorkspaceRoot } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  server:{
    fs: {
      allow: [searchForWorkspaceRoot(process.cwd()),"..","../..", "../../.."]
    }
  }
})