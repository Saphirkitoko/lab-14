import { defineConfig } from 'vite'; // Import defineConfig function from Vite
import vue from '@vitejs/plugin-vue'; // Import Vue plugin for Vite

// Define the Vite configuration
export default defineConfig({
    plugins: [vue()], // Use the Vue plugin for Vite
    server: {
        proxy: {
            '/api': 'http://localhost:3000/' // Proxy requests starting with '/api' to http://localhost:3000
        }
    }
});

