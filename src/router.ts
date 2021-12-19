import Vue from 'vue';
import VueRouter, { RouteConfig, Route, NavigationGuardNext } from 'vue-router';
import store from '@/store/index';
import HwUtils from '@/utils';

import { UserActionsType } from './store/user/actions';
import { StatusCode } from './types/common';

Vue.use(VueRouter);

const authChecker = async (to: Route, from: Route, next: NavigationGuardNext<Vue>) => {
  let isAuthenticated = false;

  try {
    await store.dispatch(UserActionsType.FETCH_STATUS);
    isAuthenticated = store.getters['User/GET_LOGIN_STATUS'] === StatusCode.SUCCESS_LOGIN;
  } catch (error) {
    console.warn(error);
  }

  if (!isAuthenticated) {
    alert('로그인이 필요합니다.');
    next('/login');
    // window.document.location.href = 'http://hiworks.wowza.co.kr/api/auth/public/login.html';
    return;
  }

  next();
};

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: HwUtils.vue.loadComponent('page/Home'),
    // beforeEnter: authChecker,
  },
  {
    path: '*',
    name: 'NotFound',
    component: HwUtils.vue.loadComponent('page/NotFound'),
    meta: {
      layout: 'empty',
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
