<script setup>
import { useAuthStore } from '@/stores/authStore.js'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import ShinkoLogo from '@/components/ui/ShinkoLogo.vue'
import KanButton from '@/components/ui/KanButton.vue'

const authStore = useAuthStore()
const router = useRouter()
const { user, isLoggedIn } = storeToRefs(authStore)

const handleLogout = async () => {
  await authStore.logout()
  router.push('/')
}
</script>

<template>
  <nav class="bg-bg-base flex sticky top-0 w-full justify-between items-center z-50 px-6 py-2">
    <div class="inline-flex">
      <ShinkoLogo :width="'40px'" />
      <h1
        class="font-display font-semibold text-text-primary leading-none tracking-tight"
        style="font-size: clamp(1rem, 3vw, 2rem)"
      >
        shinko
      </h1>
    </div>
    <div v-if="isLoggedIn" class="flex justify-between gap-4">
      <h2>{{ user?.username }}</h2>
      <button class="cursor-pointer" @click="handleLogout">logout</button>
    </div>
    <RouterLink v-else :to="{ name: 'Register' }">
      <KanButton :loading="btnLoading" :btnTitle="'Log In'" type="submit" />
    </RouterLink>
  </nav>
</template>
