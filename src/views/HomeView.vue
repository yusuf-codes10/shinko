<script setup>
import { ref } from 'vue'

const isVisible = ref(true)

const toggleVisibility = () => {
  isVisible.value = !isVisible.value
}
</script>

<template>
  <div class="flex flex-col justify-center items-center h-screen">
    <div v-if="isVisible" class="flex flex-col justify-center items-center h-screen">
      <h1 class="text-6xl md:text-9xl my-2 text-extrabold">shinko</h1>
      <button
        v-on:click="toggleVisibility"
        class="text-red-500 bg-green-400 px-1 py-2 rounded-sm cursor-pointer"
      >
        Create New Project &rarr;
      </button>
    </div>
    <div
      v-else
      class="flex flex-col justify-center items-center text-4xl px-4 py-6 bg-[#2F383D] border-white border-[0.5px] border-thin"
    >
      <h1>Create a New Project</h1>
      <div class="flex flex-col gap-1">
        <label for="projectName">projet name</label>
        <input class="bg-[#474E54]" type="text" id="projectName" />
      </div>
      <div class="flex flex-col gap-2">
        <label for="password">Password</label>
        <input class="bg-[#474E54]" type="password" id="password" />
      </div>
      <button class="bg-white px-2 py-1 mt-2 w-full text-black text-2xl cursor-pointer">
        Create Project
      </button>
    </div>
  </div>
</template>

<style scoped>
</style>
