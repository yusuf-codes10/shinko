import HomeView from '@/views/HomeView.vue'
import KanBanView from '@/views/KanBanView.vue'
import ProjectsView from '@/views/ProjectsView.vue'
import RegisterView from '@/views/RegisterView.vue'
import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '@/stores/authStore.js'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    beforeEnter: () => {
      const auth = useAuthStore()
      if (auth.isLoggedIn) {
        return { name: 'DashboardHome' }
      }
    },
  },
  {
    path: '/:username/projects',
    name: 'Projects',
    component: ProjectsView,
  },
  {
    path: '/project/:id/kanban',
    name: 'Kanban',
    component: KanBanView,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView,
    beforeEnter: () => {
      const auth = useAuthStore()
      if (auth.isLoggedIn) {
        return { name: 'DashboardHome' }
      }
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router

// TODO: we need to redirect /projects to the current loggend in user
