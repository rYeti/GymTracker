import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import MusclesRouter from './muscle.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {... MusclesRouter},
  ]
})

export default router
