import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import MusclesRouter from './muscle.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active-link',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {... MusclesRouter},
    {
      path: '/weightsinput',
      name: 'weightsinput',
      component: () => import('../views/weight/WeightsInput.vue')
    }
  ]
})

export default router
