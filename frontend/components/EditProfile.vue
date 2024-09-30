<template>
  <div class="edit-profile">
    <header>
      <h2>Edit Profile</h2>
      <button class="logout-button" @click="logout">Logout</button>
    </header>
    <form @submit.prevent="updateProfile">
      <div class="form-row">
        <input v-model="profile.first_name" type="text" placeholder="First Name" required />
        <input v-model="profile.last_name" type="text" placeholder="Last Name" required />
      </div>
      <div class="form-row">
        <input v-model="profile.email" type="email" placeholder="Email" required />
        <input v-model="profile.password" type="password" placeholder="Password" />
      </div>
      <textarea v-model="profile.biography" placeholder="Biography"></textarea>
      <button type="submit">Update Profile</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Cookies from 'js-cookie';
import { useRuntimeConfig } from '#imports';

const config = useRuntimeConfig();
const directusUrl: string = config.public.directusUrl;
const accessToken = Cookies.get('access_token');

// Define the profile structure
const profile = ref({
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  biography: ''
});
interface DirectusFetchResponse {
  message: string;
  data: {
    data: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      biography: ''
    }
  }
  statusCode: number;
  status: string;
}
// Fetch and set user data on component mount
onMounted(async () => {
  await fetchProfile();
});

// Fetch the user profile
async function fetchProfile() {
  try {
    const response: DirectusFetchResponse = await $fetch(`${directusUrl}/user/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}` // Include the access token
      }
    });

    // Set the fetched data to profile object
    profile.value = {
      first_name: response.data.data.first_name,
      last_name: response.data.data.last_name,
      email: response.data.data.email,
      password:response.data.data.password, // Password will not be fetched for security reasons
      biography: response.data.data.biography || ''
    };
  } catch (error) {
    console.error('Failed to fetch profile:', error);
  }
}

// Update the user profile
async function updateProfile() {
  try {
    const response: DirectusFetchResponse = await $fetch(`${directusUrl}/user/update-profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(profile.value)
    });

    if (response.statusCode) {
      alert('Profile updated successfully');
    } else {
      console.error('Failed to update profile.');
    }
  } catch (error) {
    console.error('Error updating profile:', error);
  }
}

// Logout function
async function logout() {
  try {
    const response: DirectusFetchResponse = await $fetch(`${directusUrl}/user/logout`, {
      method: 'POST'
    });

    if (response.statusCode) {
      document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      window.location.href = '/';
    } else {
      console.error('Failed to logout.');
    }
  } catch (error) {
    console.error('Error during logout:', error);
  }
}
</script>

<style scoped>
.edit-profile {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding-bottom: 20px;
}

h2 {
  font-weight: bold;
  margin-top: 0;
}

form {
  padding: 20px;
  border: 1px solid #ccc;
}

.form-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  margin-right: 10px;
}

input[type="text"]:last-child,
input[type="email"]:last-child,
input[type="password"]:last-child {
  margin-right: 0;
}

textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
}

button[type="submit"] {
  background-color: #4CAF50;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #3e8e41;
}

.logout-button {
  background-color: #f44336;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.logout-button:hover {
  background-color: #e91e63;
}
</style>
