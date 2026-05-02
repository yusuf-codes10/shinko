<script setup>
import NavBar from './components/NavBar.vue'
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

onMounted(() => {
  authStore.fetchUser()
})
</script>

<template>
  <div>
    <NavBar />
    <RouterView />
  </div>
</template>

<style scoped></style>
