<script setup>
import { useAuthStore } from '@/stores/authStore.js'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const { user, isLoggedIn } = storeToRefs(authStore)

const handleLogout = async () => {
  await authStore.logout()
  router.push('/')
}
</script>

<template>
  <nav class="flex justify-between items-center w-full">
    <h1 class="text-3xl">Shinko</h1>
    <div v-if="isLoggedIn" class="flex justify-between gap-4">
      <h2>{{ user?.username }}</h2>
      <button class="cursor-pointer" @click="handleLogout">logout</button>
    </div>
    <button v-else class="bg-blue-300 px-4 py-2 cursor-pointer rounded-2xl">Login</button>
  </nav>
</template>

<style scoped>
</style>
