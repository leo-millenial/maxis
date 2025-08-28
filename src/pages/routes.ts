import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/DefaultLayout.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/pages/home/HomePage.vue'),
      },
      {
        path: '/challenge',
        name: 'challenge',
        component: () => import('@/pages/challenge-page/ChallengePage.vue'),
      },
    ],
  },
]
