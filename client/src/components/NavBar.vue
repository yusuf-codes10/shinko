<script setup>
import { jwtDecode } from 'jwt-decode'

const token = localStorage.getItem('token')

let decoded = null
console.log(decoded)
if (token) {
  decoded = jwtDecode(token)
  console.log(decoded.username)
}
</script>

<template>
  <nav class="flex justify-between items-center w-full">
    <h1 class="text-3xl">Shinko</h1>
    <button class="bg-blue-300 px-4 py-2 cursor-pointer rounded-2xl">Login</button>
  </nav>
</template>

<style scoped>
</style>
