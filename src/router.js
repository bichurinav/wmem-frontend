import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    redirect: () => ({ path: '/auth' }),
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('@/pages/AuthPage.vue'),
    meta: { layout: 'auth', requireAuth: false },
  },
  {
    path: '/room/:roomID',
    name: 'room',
    component: () => import('@/pages/RoomPage.vue'),
    meta: { layout: 'main', requireAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
