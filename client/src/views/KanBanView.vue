<script setup>
import KanCard from '@/components/KanCard.vue'
import KanTask from '@/components/KanTask.vue'
import { ref, onMounted } from 'vue'

const projects = ref([])
const loading = ref(false)
const isOld = ref(false)
const tasks = ref([])
const isModalOpen = ref(false)

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

// delete request
const deleteTask = async (id) => {
  const endpoint = `http://localhost:8080/api/${id}`
  try {
    const response = await fetch(endpoint, { method: 'DELETE' })
    console.log(response)
    tasks.value = tasks.value.filter((task) => task.id !== id)
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  tasks.value = await getAllTasks()
})

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

const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value
}
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
      <teleport to="#modal" v-if="isModalOpen">
        <div class="modal-bg" @click="toggleModal">
          <div class="modal" @click.stop></div>
        </div>
      </teleport>
      <KanCard :title="'ToDo'" @create="toggleModal">
        Card 1
        <KanTask
          v-for="task in tasks"
          :key="task.id"
          :title="task.name"
          @delete="deleteTask(task.id)"
        />
      </KanCard>
      <KanCard :title="'Progress'"> Card 2 </KanCard>
      <KanCard :title="'Done'"> Card 3 </KanCard>
    </div>
  </div>
</template>

<style scoped>
.modal-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 1000;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 12px;
  width: 300px;
  max-width: 90%;

  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
