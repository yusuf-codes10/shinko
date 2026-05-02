<script setup>
import { useUserStore } from '@/stores/authStore.js'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
</script>

<template>
  <nav class="flex justify-between items-center w-full">
    <h1 class="text-3xl">Shinko</h1>
    <h2 v-if="user">{{ user.username }}</h2>
    <button v-else class="bg-blue-300 px-4 py-2 cursor-pointer rounded-2xl">Login</button>
  </nav>
</template>

<style scoped>
</style>
