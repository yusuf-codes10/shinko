<script setup>
import { ref, onMounted } from 'vue'

const projects = ref([])

const getAllProjects = async () => {
  const endpoint = 'http//:localhost:8080/api/projects'
  try {
    const response = await fetch(endpoint)
    const data = await response.json()
    console.log(data)
    return data
  } catch (error) {
    console.log(error.message)
  }
}

onMounted(async () => {
  projects.value = await getAllProjects()
})
</script>

<template>
  <div>
    <h1>This is the projects view</h1>
  </div>
</template>

<style scoped>
</style>
