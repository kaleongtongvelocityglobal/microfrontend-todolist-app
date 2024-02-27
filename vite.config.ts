import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    reactRefresh(),
    federation({
      name: 'todoList',
      filename: 'remoteEntry.js',
      exposes: {
        './TodoList': './src/TodoList',
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