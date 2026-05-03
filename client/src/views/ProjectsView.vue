<script setup>
import KanProject from '@/components/KanProject.vue'
import { ref, onMounted } from 'vue'
import { getAllProjects, createProject } from '@/services/projectService.js'

const projects = ref([])
const loading = ref(false)
const isModalOpen = ref(false)
const newProjectName = ref('')

onMounted(async () => {
  try {
    loading.value = true
    const { data } = await getAllProjects()
    projects.value = data
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
})

const createNewProject = async () => {
  try {
    const { data } = await createProject({ name: newProjectName.value })
    projects.value.push(data)
    toggleModal()
  } catch (error) {
    console.log(error)
  }
}

const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value
}
</script>

<template>
  <div>
    <header class="flex">
      <button @click="toggleModal" class="bg-bg-raised p-2 rounded ml-auto cursor-pointer">
        +New Project
      </button>
    </header>
    <teleport to="#modal" v-if="isModalOpen">
      <div class="modal-bg" @click="toggleModal">
        <div class="modal" @click.stop>
          <label for="name">Name: </label>
          <input type="text" id="name" placeholder="name.." v-model="newProjectName" />
          <button @click="createNewProject">Submit</button>
        </div>
      </div>
    </teleport>
    <div v-if="fetching">
      <h2>Loading...</h2>
    </div>
    <KanProject
      v-else
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
