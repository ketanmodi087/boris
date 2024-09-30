<template>
  <div class="login-container">
    <div class="login-box">
      <h1 class="login-title">Login</h1>
      <form @submit.prevent="login" class="login-form">
        <p v-if="error" style="color: red;text-align: center;">{{ error }}</p>
        <div class="input-group">
          <label for="email" class="input-label">Email</label>
          <input type="email" id="email" v-model="email" placeholder="Enter your email" required class="input-field" />
        </div>
        <div class="input-group">
          <label for="password" class="input-label">Password</label>
          <input type="password" id="password" v-model="password" placeholder="Enter your password" required
            class="input-field" />
        </div>
        <button type="submit" class="login-button">Login</button>
        <div class="footer-links">
          <a href="#" class="forgot-password">Forgot Password?</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from "vue";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";
import { useRuntimeConfig } from "#imports";

interface DirectusLoginResponse {
  access_token: string;
  message: string;
  statusCode: number;
  status: string;
  expires:number;
}

definePageMeta({
  middleware: 'auth'
});

const email: Ref<string> = ref("");
const password: Ref<string> = ref("");
const error = ref<string | null>(null);

const router = useRouter();
const login = async (): Promise<void> => {
  try {
    const config = useRuntimeConfig();
    const directusUrl: string = config.public.directusUrl;

    const response: DirectusLoginResponse = await $fetch(
      `${directusUrl}/auth/login`,
      {
        method: "POST",
        body: {
          email: email.value,
          password: password.value,
        },
      }
    );

    if (response?.statusCode === 200) {
      Cookies.set('access_token', response.access_token, { expires: response.expires });
      Cookies.set('refresh_token', response.access_token, { expires: response.expires });
      await router.push('/dashboard');
    } else {
      error.value = response.message ?? "Unknown error occurred.";
    }
  } catch (errors) {
    if (errors instanceof Error) {
      error.value = errors.message;
    } else {
      error.value = "Unknown error occurred.";
    }
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to right,
      #4facfe,
      #00f2fe);
  /* Gradient background */
}

.login-box {
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  /* Set max width */
}

.login-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #333;
}

.login-form {
  display: flex;
  flex-direction: column;
}

.input-group {
  margin-bottom: 15px;
}

.input-label {
  font-weight: bold;
  margin-bottom: 5px;
  color: #555;
}

.input-field {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.input-field:focus {
  border-color: #4facfe;
  /* Focus border color */
  outline: none;
  /* Remove outline */
}

.login-button {
  background-color: #4caf50;
  color: #fff;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #3e8e41;
}

.footer-links {
  margin-top: 15px;
  text-align: center;
}

.forgot-password {
  color: #4caf50;
  /* Color for the link */
  text-decoration: none;
}

.forgot-password:hover {
  text-decoration: underline;
  /* Underline on hover */
}
</style>
