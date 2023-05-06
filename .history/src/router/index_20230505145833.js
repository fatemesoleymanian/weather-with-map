import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory("http://localhost:8080/"),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
   
  ]
})

export default router
