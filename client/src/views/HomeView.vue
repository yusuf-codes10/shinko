<script setup>
import { useAuthStore } from '@/stores/authStore.js'

const authStore = useAuthStore()
</script>

<template>
  <div class="flex flex-col justify-center items-center h-screen">
    <div class="flex flex-col justify-center items-center h-screen">
      <h1 class="text-6xl md:text-9xl my-2 text-extrabold">shinko</h1>
      <RouterLink :to="{ name: 'Projects', params: { username: authStore.user?.username } }">
        <button class="text-red-500 bg-green-400 px-1 py-2 rounded-sm cursor-pointer">
          Create New Project &rarr;
        </button>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
</style>
