<template>
  <div>
    <h1 v-if="errorCode === 404">Page Not Found</h1>
    <p v-if="errorCode === 404">Redirecting...</p>
    <NuxtLink v-if="errorCode === 404" :to="redirectPath">Go to Dashboard</NuxtLink>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const token = useCookie("access_token");
const errorCode = defineProps().error?.statusCode || 404;
const router = useRouter();
let redirectPath = '/';
if (errorCode === 404) {
  redirectPath = token ? '/dashboard' : '/';
  setTimeout(() => {
    router.push(redirectPath);
  }, 2000);
}
</script>
