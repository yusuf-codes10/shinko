<script setup>
import { ref } from 'vue'

const user = ref(true)
</script>

<template>
  <div>
    This is the login view
    <div v-if="user">
      <form action="POST" @submit.prevent="handleLogin">
        <label for="username">Username</label>
        <input type="text" placeholder="username" id="username" />
        <br />
        <label for="password">Password</label>
        <input type="password" placeholder="passowrd" id="password" minlength="8" />
        <br />
        <button>Login</button>
      </form>
    </div>
    <div v-else></div>
  </div>
</template>

<style scoped>
</style>
<!-- TODO: let us leave the login/signup for later -->
