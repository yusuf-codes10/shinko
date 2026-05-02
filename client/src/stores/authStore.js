import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api.js'

export const useAuthStore = defineStore('auth', () => {
  // * state
  const user = ref(null)

  // * actions
  const register = async (credentials) => {
    await api.post('/register', credentials)
  }

  const login = async (credentials) => {
    await api.post('/register/login', credentials)
    // user.value = res.data.user
    await fetchUser()
    // populate user after login
  }

  const logout = async () => {
    await api.post('/register/logout')
    user.value = null
  }

  const fetchUser = async () => {
    try {
      const res = await api.get('/register/me')
      user.value = res.data.user
    } catch {
      user.value = null // cookie expired or invalid
    }
  }

  // * getters
  const isLoggedIn = computed(() => !!user.value)

  return {
    user,
    isLoggedIn,

    register,
    login,
    logout,
    fetchUser,
  }
})
