import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  runtimeConfig: {
    public: { // Make it public to access in the frontend
      directusUrl: 'http://localhost:3001/api',
    },
  },
  compatibilityDate: '2024-09-26',
});
