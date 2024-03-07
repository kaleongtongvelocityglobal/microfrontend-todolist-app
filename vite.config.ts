import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    reactRefresh(),
    federation({
      name: 'todoList',
      filename: 'remoteEntry.js',
      remotes: {
        remoteApp: "http://localhost:8080/assets/remoteEntry.js"
      },
      exposes: {
        './TodoList': './src/TodoList',
        './RemoteAppDirectory': './src/RemoteAppDirectory',
        './App': './src/App.tsx'
      },
      shared: ['react', 'react-dom']
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});