<script setup>
import KanProject from '@/components/KanProject.vue'
import { ref, onMounted, computed } from 'vue'
import {
  getAllProjects,
  createProject,
  countCompletedTasksByProject,
} from '@/services/projectService.js'
import KanModal from '@/components/ui/KanModal.vue'
import AddNewProject from '@/components/ui/AddNewProject.vue'
import KanButton from '@/components/ui/KanButton.vue'
import { useAuthStore } from '@/stores/authStore.js'

const projects = ref([])
const loading = ref(false)
const isModalOpen = ref(false)
const newProjectName = ref('')
const authStore = useAuthStore()
const countedCompleted = ref(0)

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

// ? FIXME: debug this
onMounted(() => {
  console.log(`username is ${authStore.user?.username}`)
  console.log(`user id is ${authStore.user?.id}`)
  console.log(`user is ${authStore.user}`)
})

// counting for every single project
onMounted(async () => await countCompletedTodos())

const createNewProject = async () => {
  try {
    const { data } = await createProject({ name: newProjectName.value })
    projects.value.push(data)
    toggleModal()
  } catch (error) {
    console.log(error)
  }
}

const countCompletedTodos = async () => {
  const { data } = await getAllProjects()
  projects.value = data

  // now you have the actual project ids
  for (const project of projects.value) {
    const { data } = await countCompletedTasksByProject(project.id)
    console.log(`project ${project.id} has ${data.count} completed tasks`)
  }
}

const countCompletedTodosPerProject = async (projectId) => {
  const { data } = await countCompletedTasksByProject(projectId)
  console.log(`project ${projectId} has ${data.count} completed tasks`)
  countedCompleted.value = Number(data.count) || 0
}

const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value
}

const checkedProjectName = computed(() => !!newProjectName.value)
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
    <KanModal :title="'Project'" :isOpen="isModalOpen" @close="toggleModal">
      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-medium text-text-secondary">Project name</label>
        <input
          type="text"
          placeholder="e.g. Design System v3"
          class="w-full bg-bg-raised border border-bg-border text-text-primary placeholder:text-text-muted text-sm px-3.5 py-2.5 rounded-btn focus:outline-none focus:border-accent focus:shadow-input transition-all duration-150"
          v-model="newProjectName"
        />
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-medium text-text-secondary">Description</label>
          <textarea
            placeholder="What's this project about?"
            rows="3"
            class="w-full bg-bg-raised border border-bg-border text-text-primary placeholder:text-text-muted text-sm px-3.5 py-2.5 rounded-btn resize-none focus:outline-none focus:border-accent focus:shadow-input transition-all duration-150"
          />
        </div>
        <KanButton
          :isDisabled="checkedProjectName"
          @click="createNewProject"
          :btnTitle="'Submit'"
        />
      </div>
    </KanModal>
    <AddNewProject @click="toggleModal" />
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
      :precentage=""
    />
  </div>
</template>

<style scoped>
</style>
