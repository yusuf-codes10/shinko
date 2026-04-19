<script setup>
import KanCard from '@/components/KanCard.vue'
import KanTask from '@/components/KanTask.vue'
import { ref, onMounted } from 'vue'

const projects = ref([])
const loading = ref(false)
const isOld = ref(false)
const tasks = ref([])

// get all
const getAllTasks = async () => {
  const endpoint = `http://localhost:8080/api`
  try {
    const response = await fetch(endpoint)
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

// fetch the data with the onMounted lifecycle hook
// onMounted(async () => {
//   const endpoint = 'http://localhost:3000/projects'
//   loading.value = true
//   try {
//     const res = await fetch(endpoint)
//     const data = await res.json()
//     projects.value = data
//   } catch (err) {
//     console.log(err.message)
//   } finally {
//     loading.value = false
//   }
// })
</script>

<template>
  <div>
    <div v-if="isOld" class="h-screen bg-amber-600">
      <h1 class="text-7xl">Is this woking?</h1>
      <div v-if="loading">
        <h1 class="text-5xl">Laoding....</h1>
      </div>
      <div class="bg-green-400 my-7" v-else v-for="project in projects" :key="project.id">
        <h1>Name: {{ project.name }}</h1>
        <h2>Status: {{ project.status }}</h2>
      </div>
    </div>
    <div v-else class="grid grid-cols-3 justify-center gap-10 w-full">
      <KanCard :title="'ToDo'">
        Card 1
        <KanTask :title="'Task 1'" />
        <KanTask :title="'Task 2'" />
        <KanTask :title="'Task 3'" />
      </KanCard>
      <KanCard :title="'Progress'"> Card 2 </KanCard>
      <KanCard :title="'Done'"> Card 3 </KanCard>
    </div>
  </div>
</template>
