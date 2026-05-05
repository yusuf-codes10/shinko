import api from '@/services/api.js'

export const getAllProjects = () => api.get('/api/projects')

export const createProject = (payload) => api.post('/api/projects', payload)

export const countCompletedTasksByProject = (id) => api.get(`/api/projects/${id}/count`)
