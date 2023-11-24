import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home-page',
      component: () => import('@/views/HomePage.vue')
    },
    {
      path: '/archive',
      name: 'archive-page',
      children: [
        {
          path: '/archive',
          component: () => import('@/views/ArchivePage.vue')
        }
      ]
    }
  ]
})

export default router
