import CreateView from '@/views/CreateView.vue'
import HomeView from '@/views/HomeView.vue'
import KanBanView from '@/views/KanBanView.vue'
import ProjectsView from '@/views/ProjectsView.vue'
import RegisterView from '@/views/RegisterView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  // {
  //   path: '/kanban',
  //   name: 'Kanban',
  //   component: KanBanView,
  // },
  {
    path: '/create',
    name: 'Create',
    component: CreateView,
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
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router

// TODO: we need to redirect /projects to the current loggend in user
