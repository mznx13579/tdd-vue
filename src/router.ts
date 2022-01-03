import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: () => import(`@/pages/Home.vue`),
  },
  {
    path: '/money',
    name: 'Money',
    component: () => import('@/pages/Money.vue'),
  },
  {
    path: '/select',
    name: 'Select',
    component: () => import('@/pages/Select.vue'),
  },
  {
    path: '/stopwatch',
    name: 'Stopwatch',
    component: () => import('@/pages/Stopwatch.vue'),
  },
  {
    path: '/time',
    name: 'Time',
    component: () => import('@/pages/Time.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
