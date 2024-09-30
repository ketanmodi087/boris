<template>
  <div class="container">
    <header>
      <h2>Items List</h2>
    </header>

    <form @submit.prevent="addItem" class="item-form">
      <input v-model="newItem.name" type="text" placeholder="Name" required />
      <input v-model="newItem.date" type="datetime-local" required />
      <label>
        <input v-model="newItem.important" type="checkbox" /> Important
      </label>
      <button type="submit">Add Item</button>
    </form>
    <ul v-if="items.length > 0" class="items-list">
      <li v-for="item in items" :key="item.id">
        <strong>{{ item.name }}</strong> -
        {{ new Date(item.date).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' }) }} -
        <span :class="{ important: item.important }">Important: {{ item.important ? 'Yes' : 'No' }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Cookies from "js-cookie";
import { useRuntimeConfig } from "#imports";
const config = useRuntimeConfig();

// Define the interface for an Item
interface Item {
  id: number;
  name: string;
  date: string;
  important: boolean;
}

const items = ref<Item[]>([]);
const directusUrl: string = config.public.directusUrl;

// Define the new item object with its correct type
const newItem = ref<Omit<Item, 'id'>>({
  name: '',
  date: '',
  important: false,
});

const accessToken = Cookies.get('access_token');
async function fetchItems() {
  const response: any = await $fetch(`${directusUrl}/items`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`, // Pass the access token
    },
  });

  if (response.statusCode === 200) {
    items.value = await response.data;
  } else if (response.statusCode === 401) {
    return navigateTo('/')
  }
}

async function addItem() {
  const response: any = await $fetch(`${directusUrl}/items/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`, // Pass the access token
    },
    body: JSON.stringify(newItem.value),
  });

  if (response.statusCode === 200) {
    alert(`${response.message}`)
    fetchItems(); // Refresh the list after adding
  } else {
    console.error('Failed to add item.');
  }
}

onMounted(() => {
  fetchItems();
});
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

header {
  border-bottom: 1px solid #ccc;
  padding-bottom: 20px;
}

h2 {
  font-weight: bold;
  margin-top: 0;
}

.items-list {
  max-height: 300px;
  /* Set a fixed height */
  overflow-y: auto;
  /* Make it scrollable */
  list-style: none;
  padding: 0;
  margin: 0 0 20px;
}

li {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

li:last-child {
  border-bottom: none;
}

.important {
  color: red;
}

.item-form {
  display: flex;
  flex-wrap: wrap;
  /* Allow wrapping for responsiveness */
  align-items: center;
  /* Align items vertically in the center */
  border: 1px solid #ccc;
  padding: 20px;
  margin-top: 20px;
  background-color: #f9f9f9;
  /* Light background for form */
}

input[type="text"],
input[type="datetime-local"] {
  padding: 10px;
  border: 1px solid #ccc;
  margin-right: 10px;
  /* Space between inputs */
  flex: 1;
  /* Make inputs flexible */
  min-width: 150px;
  /* Minimum width for inputs */
}

label {
  margin-right: 10px;
  /* Space between label and button */
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
</style>
