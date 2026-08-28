import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
  const light = ref(true)

  const toggleTheme = () => {
    light.value = !light.value
  }

  return {
    light,
    toggleTheme,
  }
})
