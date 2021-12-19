import { Module } from 'vuex';
import { UserState, userState } from './state';
import { RootState } from '../types';
import { userMutations } from './mutations';
import { userActions } from './actions';
import { userGetters } from './getters';

const userModules: Module<UserState, RootState> = {
  state: userState,
  mutations: userMutations,
  actions: userActions,
  getters: userGetters,
};

export default userModules;
