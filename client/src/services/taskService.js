import api from '@/services/api.js'

export const getTodosById = (id) => api.get(`/api/task/todo/${id}`)

export const getProgressesById = (id) => api.get(`/api/task/porgress/${id}`)

export const getDonesB$yId = (id) => api.get(`/api/task/done/${id}`)

export const getTaskById = (id) => api.get(`/api/task/${id}`)

export const createNewTask = (id) => api.post(`/api/task/${id}`)

export const updateTask = (id) => api.put(`/api/task/${id}`)

export const deleteTask = (id) => api.delete(`/api/task/${id}`)
