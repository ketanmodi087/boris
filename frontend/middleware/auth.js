// middleware/auth.ts

import { useRuntimeConfig } from '#imports';
export default defineNuxtRouteMiddleware(async (to, from) => {
  const accessToken = useCookie('access_token').value;
  const refreshToken = useCookie('refresh_token').value;
  const config = useRuntimeConfig();
  const directusUrl = config.public.directusUrl;
  if (!accessToken && refreshToken) {
    try {
      const { data } = await $fetch(`${directusUrl}/auth/refresh-token`, {
        method: 'POST',
        body: { refreshToken }
      });

      // Store the new tokens
      useCookie('access_token').value = data.accessToken;
      useCookie('refresh_token').value = data.refreshToken;
    } catch (error) {
      console.log('error: ', error);
    }
  } else {
    console.log('to.name: ', to.name);
    if (!accessToken && to.name !== 'index') {
      console.log(123);
      // Redirect to login page if not authenticated
      return navigateTo('/');
    } else if (accessToken && to.name === 'index') {
      // Redirect to dashboard if trying to access login while logged in
      return navigateTo('/dashboard');
    }
  }
});
