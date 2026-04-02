<script setup>
import { ref } from 'vue'

const isVisible = ref(false)
</script>

<template>
  <div>
    <div v-if="isVisible" class="flex flex-col justify-center items-center h-screen">
      <h1 class="text-6xl md:text-9xl my-2 text-extrabold">shinko</h1>
      <button class="text-red-500 bg-green-400 px-1 py-2 rounded-sm cursor-pointer">
        Create New Project &rarr;
      </button>
    </div>
    <div v-else class="flex flex-col justify-center items-center h-screen">
      <h1>Create a New Project</h1>
      <div>
        <label for="projectName">projet name</label>
        <input type="text" id="projectName" />
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" id="password" />
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
