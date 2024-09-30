<script setup lang="ts">
import { ref } from 'vue';
import ItemsList from '../components/ItemsList.vue';
import EditProfile from '../components/EditProfile.vue';

definePageMeta({
  middleware: ['auth']
});

const selectedTab = ref('items');
function selectTab(tab: string) {
  selectedTab.value = tab;
}
</script>
<template>
  <div class="dashboard">
    <header>
      <h1>Admin Dashboard</h1>
    </header>
    <div class="tabs">
      <button :class="{ active: selectedTab === 'items' }" @click="selectTab('items')">Items</button>
      <button :class="{ active: selectedTab === 'profile' }" @click="selectTab('profile')">Edit Profile</button>
    </div>

    <div v-if="selectedTab === 'items'">
      <ItemsList />
    </div>
    <div v-if="selectedTab === 'profile'">
      <EditProfile />
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  text-align: center;
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

header {
  border-bottom: 1px solid #ccc;
  padding-bottom: 20px;
}

h1 {
  font-weight: bold;
  margin-top: 0;
}

.tabs {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.tabs button {
  padding: 10px 20px;
  margin: 0 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.active {
  font-weight: bold;
  border-bottom: 2px solid blue;
}

.content-area {
  padding: 20px;
  border: 1px solid #ccc;
}
</style>