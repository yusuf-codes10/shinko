<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore.js'

const username = ref('')
const password = ref('')
const verifiedPassword = ref('')
const email = ref('')

const isLogin = ref(true)

const router = useRouter()
const authStore = useAuthStore()

const createUser = async () => {
  if (password.value !== verifiedPassword.value) {
    console.log('Passwords do not match!')
    return
  }

  try {
    await authStore.register({
      username: username.value,
      password: password.value,
      email: email.value,
    })
    // log user in automatically
    await logUserIn()
    router.push('/projects')
  } catch (err) {
    console.log('REGISTER ERROR:', err.response?.data || err.message)
  }
}

const logUserIn = async () => {
  try {
    await authStore.login({
      username: username.value,
      password: password.value,
    })

    router.push('/projects')
  } catch (err) {
    console.log('LOGIN ERROR:', err.response?.data || err.message)
  }
}

const cancelForm = () => {
  username.value = ''
  password.value = ''
  verifiedPassword.value = ''
  email.value = ''
}

const toggleLogin = () => {
  isLogin.value = !isLogin.value
}
</script>

<template>
  <div class="flex justify-center items-center h-dvh">
    <form></form>

    <!-- REGISTER -->
    <form @submit.prevent="createUser" v-if="isLogin" class="flex flex-col w-80 gap-2">
      <h1 class="text-3xl extrabold">Create a new account</h1>

      <label for="email" class="text-xs font-medium text-text-secondary">Email</label>
      <input
        type="text"
        id="email"
        placeholder="example@email.com"
        class="w-full bg-bg-raised border border-bg-border text-text-primary placeholder:text-text-muted text-sm px-3.5 py-2.5 rounded-btn focus:outline-none focus:border-accent focus:shadow-input transition-all duration-150"
        v-model="email"
        required
      />

      <label for="username" class="text-xs font-medium text-text-secondary">Username</label>
      <input
        type="text"
        id="username"
        placeholder="johnDoe"
        class="w-full bg-bg-raised border border-bg-border text-text-primary placeholder:text-text-muted text-sm px-3.5 py-2.5 rounded-btn focus:outline-none focus:border-accent focus:shadow-input transition-all duration-150"
        v-model="username"
        required
      />

      <label for="password" class="text-xs font-medium text-text-secondary">Password</label>
      <input
        type="password"
        id="password"
        minlength="8"
        autocomplete="new-password"
        placeholder="Password ..."
        class="w-full bg-bg-raised border border-bg-border text-text-primary placeholder:text-text-muted text-sm px-3.5 py-2.5 rounded-btn focus:outline-none focus:border-accent focus:shadow-input transition-all duration-150"
        v-model="password"
        required
      />

      <label for="confirmPassword" class="text-xs font-medium text-text-secondary"
        >Confirm Password</label
      >
      <input
        type="password"
        id="confirmPassword"
        minlength="8"
        autocomplete="new-password"
        placeholder="Confirm Password"
        class="w-full bg-bg-raised border border-bg-border text-text-primary placeholder:text-text-muted text-sm px-3.5 py-2.5 rounded-btn focus:outline-none focus:border-accent focus:shadow-input transition-all duration-150"
        v-model="verifiedPassword"
        required
      />

      <div>
        <p @click="toggleLogin" class="text-xs font-medium text-text-secondary underline">
          Don't have an account?
        </p>
      </div>

      <div class="flex justify-between">
        <button
          type="submit"
          class="inline-flex items-center gap-2 bg-accent hover:bg-accent-light active:bg-accent-dark text-text-inverse font-medium text-sm px-5 py-2.5 rounded-btn transition-all duration-150 hover:shadow-accent cursor-pointer"
        >
          Register
        </button>

        <button
          type="button"
          @click="cancelForm"
          class="inline-flex items-center gap-2 bg-transparent hover:bg-bg-raised text-text-secondary hover:text-text-primary border border-bg-border hover:border-accent/40 font-medium text-sm px-5 py-2.5 rounded-btn transition-all duration-150 cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </form>

    <!-- LOGIN -->
    <form @submit.prevent="logUserIn" v-else class="flex flex-col w-80 gap-2">
      <h1 class="text-3xl extrabold">Login</h1>

      <label for="username" class="text-xs font-medium text-text-secondary">Username</label>
      <input
        type="text"
        id="username"
        placeholder="johnDoe"
        class="w-full bg-bg-raised border border-bg-border text-text-primary placeholder:text-text-muted text-sm px-3.5 py-2.5 rounded-btn focus:outline-none focus:border-accent focus:shadow-input transition-all duration-150"
        v-model="username"
        required
      />

      <label for="password" class="text-xs font-medium text-text-secondary">Password</label>
      <input
        type="password"
        id="loginPassword"
        minlength="8"
        placeholder="Password ..."
        autocomplete="current-password"
        class="w-full bg-bg-raised border border-bg-border text-text-primary placeholder:text-text-muted text-sm px-3.5 py-2.5 rounded-btn focus:outline-none focus:border-accent focus:shadow-input transition-all duration-150"
        v-model="password"
        required
      />

      <div>
        <p @click="toggleLogin" class="text-xs font-medium text-text-secondary underline">
          Log in instead?
        </p>
      </div>

      <div class="flex justify-between">
        <button
          type="submit"
          class="inline-flex items-center gap-2 bg-accent hover:bg-accent-light active:bg-accent-dark text-text-inverse font-medium text-sm px-5 py-2.5 rounded-btn transition-all duration-150 hover:shadow-accent cursor-pointer"
        >
          Login
        </button>

        <button
          type="button"
          @click="cancelForm"
          class="inline-flex items-center gap-2 bg-transparent hover:bg-bg-raised text-text-secondary hover:text-text-primary border border-bg-border hover:border-accent/40 font-medium text-sm px-5 py-2.5 rounded-btn transition-all duration-150 cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>
