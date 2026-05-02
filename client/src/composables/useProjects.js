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

export const useCreateProject = () => {
  const loading = ref(false)
  const error = ref(null)

  const create = async (payload) => {
    try {
      loading.value = true
      const { data } = await createProject(payload)
      return data
    } catch (err) {
      error.value = err
      console.log(error.value)
    } finally {
      loading.value = false
    }
  }

  return {
    create,
    loading,
    error,
  }
}
