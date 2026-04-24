<script setup>
import KanProject from '@/components/KanProject.vue'
import { ref, onMounted } from 'vue'

const BASE_URL = import.meta.env.VITE_API_URL

const projects = ref([])
const isModalOpen = ref(false)
const newProjectName = ref('')

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

const createProject = async () => {
  const endpoint = `${BASE_URL}/api/projects`

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        name: newProjectName.value,
      }),
    })
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}

const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value
}

onMounted(async () => {
  projects.value = await getAllProjects()
})
</script>

<template>
  <div>
    <h1>This is the projects view</h1>
    <button @click="toggleModal" class="bg-green-500 p-2 rounded">Create a new project</button>
    <teleport to="#modal" v-if="isModalOpen">
      <div class="modal-bg" @click="toggleModal">
        <div class="modal" @click.stop>
          <label for="name">Name: </label>
          <input type="text" id="name" placeholder="name.." v-model="newProjectName" />
          <button @click="createProject">Submit</button>
        </div>
      </div>
    </teleport>
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
