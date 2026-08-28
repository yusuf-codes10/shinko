import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
  const light = ref(localStorage.getItem('theme') === 'light')

  const toggleTheme = () => {
    light.value = !light.value
  }

  // a watch for the state
  // single place that touches the DOM — runs on load and on every change
  watch(
    light,
    (isLight) => {
      document.documentElement.classList.toggle('light', isLight)
      localStorage.setItem('theme', isLight ? 'light' : 'dark')
    },
    { immediate: true },
  )

  return {
    light,
    toggleTheme,
  }
})
