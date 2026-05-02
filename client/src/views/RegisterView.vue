<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/useUserStore'
import api from '@/services/api.js'

const username = ref('')
const password = ref('')
const verifiedPassword = ref('')
const email = ref('')
const isLogin = ref(true)

const router = useRouter()
const userStore = useUserStore()

const createUser = async () => {
  if (password.value !== verifiedPassword.value) return console.log('Passwords do not match!')
  try {
    const { data } = await api.post('/register', {
      username: username.value,
      password: password.value,
      email: email.value,
    })
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}

const logUserIn = async () => {
  try {
    const { data } = await api.post('/register/login', {
      username: username.value,
      password: password.value,
    })
    userStore.setUser(data.user) // cookie is set automatically by the browser
    router.push(`/${username.value}/projects`)
  } catch (error) {
    console.log(error.message)
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
    <div v-if="isLogin" class="flex flex-col w-80 gap-2">
      <h1 class="text-3xl extrabold">Create a new account</h1>
      <label for="email">Email</label>
      <input
        type="email"
        id="email"
        placeholder="example@email.com"
        class="bg-white p-2"
        v-model="email"
      />
      <label for="username">Username</label>
      <input
        type="text"
        id="username"
        placeholder="johnDoe"
        class="bg-white p-2"
        v-model="username"
      />
      <label for="password">Password</label>
      <input
        type="password"
        id="password"
        minlength="8"
        placeholder="Password ..."
        class="bg-white p-2"
        v-model="password"
      />
      <label for="password">Confirm Password</label>
      <input
        type="password"
        id="password"
        minlength="8"
        placeholder="Confirm Password"
        class="bg-white p-2"
        v-model="verifiedPassword"
      />
      <div>
        <p @click="toggleLogin" class="text-blue-700 underline cursor-pointer">
          Don't have an account?
        </p>
      </div>
      <div class="flex justify-between">
        <button @click="createUser" class="bg-blue-300 cursor-pointer px-2 py rounded">
          Register
        </button>
        <button @click="cancelForm" class="bg-blue-300 cursor-pointer px-2 py rounded">
          Cancel
        </button>
      </div>
    </div>
    <div v-else class="flex flex-col w-80 gap-2">
      <h1 class="text-3xl extrabold">Login</h1>
      <label for="username">Username</label>
      <input
        type="text"
        id="username"
        placeholder="johnDoe"
        class="bg-white p-2"
        v-model="username"
      />
      <label for="password">Password</label>
      <input
        type="password"
        id="password"
        minlength="8"
        placeholder="Password ..."
        class="bg-white p-2"
        v-model="password"
      />
      <label for="password">Confirm Password</label>
      <input
        type="password"
        id="password"
        minlength="8"
        placeholder="Confirm Password"
        class="bg-white p-2"
        v-model="verifiedPassword"
      />
      <div>
        <p @click="toggleLogin" class="text-blue-700 underline cursor-pointer">Log in instead?</p>
      </div>
      <div class="flex justify-between">
        <button @click="logUserIn" class="bg-blue-300 cursor-pointer px-2 py rounded">Login</button>
        <button @click="cancelForm" class="bg-blue-300 cursor-pointer px-2 py rounded">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>
