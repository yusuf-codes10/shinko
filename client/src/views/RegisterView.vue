<script setup>
import { ref } from 'vue'

const username = ref('')
const password = ref('')
const verifiedPassword = ref('')
const email = ref('')
</script>

<template>
  <div class="flex flex-col w-80 gap-2">
    <label for="email">Email</label>
    <input type="email" id="email" class="bg-white" />
    <label for="username">Username</label>
    <input type="text" id="username" class="bg-white" />
    <label for="password">Password</label>
    <input type="password" id="password" minlength="8" class="bg-white" />
    <label for="password">Password</label>
    <input type="password" id="password" minlength="8" class="bg-white" />
    <div class="flex justify-between">
      <button class="bg-blue-300 cursor-pointer px-2 py rounded">Register</button>
      <button class="bg-blue-300 cursor-pointer px-2 py rounded">Cancel</button>
    </div>
  </div>
</template>
