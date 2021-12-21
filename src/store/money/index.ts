import { Module } from 'vuex';
import { MoneyState, moneyState } from './state';
import { RootState } from '../types';
import { moneyMutations } from './mutations';
import { moneyActions } from './actions';
import { moneyGetters } from './getters';

const moneyModules: Module<MoneyState, RootState> = {
  state: moneyState,
  mutations: moneyMutations,
  actions: moneyActions,
  getters: moneyGetters,
};

export default moneyModules;
