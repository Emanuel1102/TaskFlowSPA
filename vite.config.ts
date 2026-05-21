import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        home: resolve(__dirname, 'src/views/home.html'),
        login: resolve(__dirname, 'src/views/login.html'),
        register: resolve(__dirname, 'src/views/register.html'),
        dashboard: resolve(__dirname, 'src/views/dashboard.html'),
        tasks: resolve(__dirname, 'src/views/tasks.html'),
        taskForm: resolve(__dirname, 'src/views/task-form.html'),
        profile: resolve(__dirname, 'src/views/profile.html'),
        admin: resolve(__dirname, 'src/views/admin.html'),
        notFound: resolve(__dirname, 'src/views/not-found.html'),
      },
    },
  },
})
