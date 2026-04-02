<script setup>
import { ref, onMounted } from 'vue'

const data = ref([])

// fetch the data with the onMounted lifecycle hook
onMounted(() => {
  const endpoint = 'http://localhost:3000/projects'
  fetch(endpoint)
    .then((res) => res.json())
    .then((d) => (data.value = d))
    .catch((err) => console.log(err.message))
})

console.log(data.value)
</script>

<template>
  <div>
    <h1 class="text-7xl">Is this woking?</h1>
    <div class="h-screen bg-amber-600" v-for="project in data" :key="project.id">
      <h1>Name: {{ project.name }}</h1>
      <h2>Status: {{ project.status }}</h2>
    </div>
  </div>
</template>

<style scoped>
</style>
