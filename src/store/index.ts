import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import moneyModule from './money';
import { RootState } from './types';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  modules: {
    // Example: exampleModule
    Money: moneyModule,
  },
};

export default new Vuex.Store(store);
