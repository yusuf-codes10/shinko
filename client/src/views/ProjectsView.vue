<script setup>
import KanProject from '@/components/KanProject.vue'
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
    console.log(error)
  }
}

onMounted(async () => {
  projects.value = await getAllProjects()
})
</script>

<template>
  <div>
    <h1>This is the projects view</h1>
    <KanProject
      v-for="project in projects"
      :key="project.id"
      :name="project.name"
      :description="project.description"
    />
  </div>
</template>

<style scoped>
</style>
