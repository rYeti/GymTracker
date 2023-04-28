import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import MusclesRouter from './muscle.router.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {... MusclesRouter},
    // {
    //   path: '/chest',
    //   name: 'chest',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/Muscles/ChestView.vue')
    // },
    // {
    //   path: '/shoulder',
    //   name: 'shoulder',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/Muscles/ShoulderView.vue')
    // },
    // {
    //   path: '/legs',
    //   name: 'legs',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/Muscles/LegsView.vue')
    // },
    // {
    //   path: '/back',
    //   name: 'back',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/Muscles/BackView.vue')
    // },
    // {
    //   path: '/biceps',
    //   name: 'biceps',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/Muscles/BicepsView.vue')
    // },
    // {
    //   path: '/triceps',
    //   name: 'triceps',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/Muscles/TricepsView.vue')
    // },
  ]
})

export default router
