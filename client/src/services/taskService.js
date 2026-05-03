import api from '@/services/api.js'

export const getTodosById = (id) => api.get(`/api/task/todo/${id}`)

export const getProgressesById = (id) => api.get(`/api/task/progress/${id}`)

export const getDonesById = (id) => api.get(`/api/task/done/${id}`)

export const getTaskById = (id) => api.get(`/api/task/${id}`)

export const createNewTask = (id, payload) => api.post(`/api/task/${id}`, payload)

export const updateTask = (id, payload) => api.put(`/api/task/${id}`, payload)

export const deleteTask = (id) => api.delete(`/api/task/${id}`)
