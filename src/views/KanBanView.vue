<script setup>
import { ref, onMounted } from 'vue'

const projects = ref([])
const loading = ref(false)

// fetch the data with the onMounted lifecycle hook
onMounted(async () => {
  const endpoint = 'http://localhost:3000/projects'
  loading.value = true
  try {
    const res = await fetch(endpoint)
    const data = await res.json()
    projects.value = data
  } catch (err) {
    console.log(err.message)
  } finally {
    loading.value = true
  }
})
</script>

<template>
  <div class="h-screen bg-amber-600">
    <h1 class="text-7xl">Is this woking?</h1>
    <div class="bg-green-400 my-7" v-for="project in projects" :key="project.id">
      <h1>Name: {{ project.name }}</h1>
      <h2>Status: {{ project.status }}</h2>
    </div>
  </div>
</template>

<style scoped>
</style>
