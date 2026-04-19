import { defineConfig } from 'vite';

export default defineConfig({
  base: '/halloween-dawn-anger/',
  server: {
    host: true,
    allowedHosts: ['.trycloudflare.com', '.loca.lt', '.ngrok-free.app', '.ngrok.io'],
  },
});
