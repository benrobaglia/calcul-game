import { createRouter, createWebHistory } from 'vue-router'
import SettingsPage from '@/components/SettingsPage.vue'
import GamePage from '@/components/GamePage.vue'
import ResultsPage from '@/components/ResultsPage.vue'

const routes = [
  {
    path: '/',
    name: 'Settings',
    component: SettingsPage
  },
  {
    path: '/game',
    name: 'Game',
    component: GamePage
  },
  {
    path: '/results',
    name: 'Results',
    component: ResultsPage
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
