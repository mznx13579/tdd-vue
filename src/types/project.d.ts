import Vue from 'vue';
import EVENT from '@/events';
import lodash from 'lodash';
import { CustomStore } from '../store/types';

declare module 'vue/types/vue' {
  interface Vue {
    $store: CustomStore;
    HW_EVENT_NAMES: typeof EVENT;
    $eventHub: Vue;
    _: typeof lodash;
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    store?: CustomStore;
  }
}
