import CreateView from '@/views/CreateView.vue'
import HomeView from '@/views/HomeView.vue'
import KanBanView from '@/views/KanBanView.vue'
import LoginView from '@/views/LoginView.vue'
import ProjectsView from '@/views/ProjectsView.vue'
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
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/projects',
    name: 'Projects',
    component: ProjectsView,
  },
  {
    path: 'project/:id',
    name: 'Kanban',
    componet: KanBanView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
