<script setup>
import { useAuthStore } from '@/stores/authStore.js'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useThemeStore } from '@/stores/themeStore'
import ShinkoLogo from '@/components/ui/ShinkoLogo.vue'
import KanButton from '@/components/ui/KanButton.vue'

const authStore = useAuthStore()
const router = useRouter()
const themeStore = useThemeStore()
const { user, isLoggedIn } = storeToRefs(authStore)

const handleLogout = async () => {
  await authStore.logout()
  router.push('/')
}
</script>

<template>
  <nav class="bg-bg-base flex sticky top-0 w-full justify-between items-center z-50 px-6 py-2">
    <RouterLink :to="{ name: 'Home' }">
      <div class="inline-flex">
        <ShinkoLogo :width="'40px'" />
        <h1
          class="font-display font-semibold text-text-primary leading-none tracking-tight"
          style="font-size: clamp(1rem, 3vw, 2rem)"
        >
          shinko
        </h1>
      </div>
    </RouterLink>
    <div class="flex justify-between gap-2">
      <div>
        <a href="https://github.com/yusuf-codes10/shinko">
          <i class="fa-brands fa-github cursor-pointer"></i>
        </a>
      </div>
      <div>
        <i
          v-if="themeStore.light"
          @click="themeStore.toggleTheme"
          class="fa-solid fa-moon cursor-pointer"
        ></i>
        <i v-else @click="themeStore.toggleTheme" class="fa-solid fa-sun cursor-pointer"></i>
      </div>
      <div v-if="isLoggedIn" class="flex justify-between gap-2">
        <RouterLink :to="`/${user?.username}`">
          <h2 class="cursor-pointer">{{ user?.username }}</h2>
        </RouterLink>
        <button class="cursor-pointer" @click="handleLogout">logout</button>
      </div>
      <RouterLink v-else :to="{ name: 'Register' }">
        <KanButton :btnTitle="'Log In'" type="submit" />
      </RouterLink>
    </div>
  </nav>
</template>
