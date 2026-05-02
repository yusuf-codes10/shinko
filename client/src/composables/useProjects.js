import { ref, onMounted } from 'vue'
import { getAllProjects, createProject } from '@/services/projectService.js'

export const fetchAllProjects = () => {
  const projects = ref([])
  const loading = ref(false)

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
  return {
    projects,
    loading,
  }
}

export const createProject = () => {}
