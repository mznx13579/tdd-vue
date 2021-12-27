import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/ko';
import _ from 'lodash';
import moment from 'moment';
import EVENT from '@/events/index';

import App from './App.vue';
import router from './router';
import store from './store';

import common from './common';
import '@/assets/scss/style.scss';

Vue.prototype._ = _;
Vue.prototype.moment = moment;
Vue.prototype.common = common;
Vue.prototype.$eventHub = new Vue(); // Global event bus
Vue.prototype.HW_EVENT_NAMES = EVENT;

Vue.config.productionTip = false;

Vue.use(ElementUI, { locale });

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
