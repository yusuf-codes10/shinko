<script setup>
import KanProject from '@/components/KanProject.vue'
import { ref, onMounted } from 'vue'
import { getAllProjects, createProject } from '@/services/projectService.js'
import KanModal from '@/components/ui/KanModal.vue'
import AddNewProject from '@/components/ui/AddNewProject.vue'
import KanButton from '@/components/ui/KanButton.vue'

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
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
    <!-- <header class="flex">
      <button @click="toggleModal" class="bg-bg-raised p-2 rounded ml-auto cursor-pointer">
        +New Project
      </button>
    </header> -->
    <KanModal :isOpen="isModalOpen" @close="toggleModal">
      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-medium text-text-secondary">Project name</label>
        <input
          type="text"
          placeholder="e.g. Design System v3"
          class="w-full bg-bg-raised border border-bg-border text-text-primary placeholder:text-text-muted text-sm px-3.5 py-2.5 rounded-btn focus:outline-none focus:border-accent focus:shadow-input transition-all duration-150"
          v-model="newProjectName"
        />
        <KanButton @click="createNewProject" :btnTitle="'Submit'" />
      </div>
    </KanModal>
    <AddNewProject />
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
