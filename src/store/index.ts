import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import userModule from './user';
import { RootState } from './types';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  modules: {
    // Example: exampleModule
    User: userModule,
  },
};

export default new Vuex.Store(store);
