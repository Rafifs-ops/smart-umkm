import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/HomeView.vue'
import ScanView from '../pages/ScanView.vue'
import InputView from '../pages/InputView.vue'
import ListView from '../pages/ListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/scan',
      name: 'scan',
      component: ScanView
    },
    {
      path: '/input',
      name: 'input',
      component: InputView
    },
    {
      path: '/list',
      name: 'list',
      component: ListView
    }
  ],
})

export default router
