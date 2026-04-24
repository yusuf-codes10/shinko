<script setup>
import { ref } from 'vue'

const username = ref('')
const password = ref('')
const verifiedPassword = ref('')
const email = ref('')

const createUser = async () => {
  const endpoint = `http://localhost:8080/register`

  // check if the two passwords match
  if (password.value !== verifiedPassword.value) return console.log('wrong password!')

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
        email: email.value,
      }),
    })
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}

const cancelForm = () => {
  username.value = ''
  password.value = ''
  verifiedPassword.value = ''
  email.value = ''
}
</script>

<template>
  <div class="flex flex-col w-80 gap-2">
    <label for="email">Email</label>
    <input
      type="email"
      id="email"
      placeholder="example@email.com"
      class="bg-white"
      v-model="email"
    />
    <label for="username">Username</label>
    <input type="text" id="username" placeholder="johnDoe" class="bg-white" v-model="username" />
    <label for="password">Password</label>
    <input
      type="password"
      id="password"
      minlength="8"
      placeholder="Password ..."
      class="bg-white"
      v-model="password"
    />
    <label for="password">Confirm Password</label>
    <input
      type="password"
      id="password"
      minlength="8"
      placeholder="Confirm Password"
      class="bg-white"
      v-model="verifiedPassword"
    />
    <div class="flex justify-between">
      <button @click="createUser" class="bg-blue-300 cursor-pointer px-2 py rounded">
        Register
      </button>
      <button @click="cancelForm" class="bg-blue-300 cursor-pointer px-2 py rounded">Cancel</button>
    </div>
  </div>
</template>
