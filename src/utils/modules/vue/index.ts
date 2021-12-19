import { Component } from 'vue';

type DynamicVueComponent = () => Promise<Component>;

const vue = {
  //! vue-router dynamic import 구문을 이용한 컴포넌트 lazy loading
  //* ex) 적용하고자 하는 vue 파일의 경로가 '@/pages/Login/FindPassword.vue'인 경우 router.ts의 component 속성 값으로 사용하는 방법

  //* [#1] 유틸 함수 전체 import
  //* import HwUtils from '@/utils';
  //* HwUtils.vue.loadComponent('pages/Login/FindPassword');

  //* [#2] vue 관련 유틸 함수 부분 import
  //* import { vue as vueUtils } from '@/utils/modules/vue';
  //* vueUtils.loadComponent('pages/Login/FindPassword');
  loadComponent(url: string): DynamicVueComponent {
    return () => import(`@/${url}.vue`);
  },
};

export { vue };
