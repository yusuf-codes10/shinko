<script setup>
import KanProject from '@/components/KanProject.vue'
import { ref, onMounted } from 'vue'

const BASE_URL = import.meta.env.VITE_API_URL

const projects = ref([])

const getAllProjects = async () => {
  const endpoint = `${BASE_URL}/api/projects`
  try {
    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
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
      :id="project.id"
      :name="project.name"
      :description="project.description"
    />
  </div>
</template>

<style scoped>
</style>
