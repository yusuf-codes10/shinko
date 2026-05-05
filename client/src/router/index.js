import HomeView from '@/views/HomeView.vue'
import KanBanView from '@/views/KanBanView.vue'
import ProjectsView from '@/views/ProjectsView.vue'
import RegisterView from '@/views/RegisterView.vue'
import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '@/stores/authStore.js'
import GlobalView from '@/views/GlobalView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    beforeEnter: () => {
      const auth = useAuthStore()
      if (auth.isLoggedIn) {
        return { name: 'Projects' }
      }
    },
  },
  {
    path: '/projects',
    name: 'Projects',
    component: ProjectsView,
    meta: { requiresAuth: true },
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
        return { name: 'Home' }
      }
    },
  },
  {
    path: '/global',
    name: 'Global',
    component: GlobalView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// runs before every route, guarantees user is resolved before any component mounts
router.beforeEach(async () => {
  const authStore = useAuthStore()
  if (authStore.user === null) {
    await authStore.fetchUser()
  }
})

export default router

// TODO: we need to redirect /projects to the current loggend in user
