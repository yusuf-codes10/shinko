import api from '@/services/api.js'

export const getAllProjects = () => api.get('/api/projects')

export const createProject = () => api.post('/api/projects')
