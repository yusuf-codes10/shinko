<script setup>
import KanProject from '@/components/KanProject.vue'
import { ref, onMounted } from 'vue'
import { getAllProjects, createProject } from '@/services/projectService.js'
import KanModal from '@/components/ui/KanModal.vue'

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
    <KanModal :isOpen="isModalOpen" @close="toggleModal">
      <label for="name">Name: </label>
      <input type="text" id="name" placeholder="name.." v-model="newProjectName" />
      <button @click="createNewProject">Submit</button>
    </KanModal>
    <div v-if="loading">
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
</style>
