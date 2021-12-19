import { ActionContext } from 'vuex';
import { RootState } from '@/store/types';
import authApi from '@/api/authApi';
import { UserMutations, UserMutationsType } from './mutations';
import { UserState } from './state';

export enum UserActionsType {
  FETCH_STATUS = 'User/FETCH_STATUS',
}

export const userActions = {
  async [UserActionsType.FETCH_STATUS](context: UserActionContext) {
    let status = 0;
    let token = '';
    try {
      const { data } = await authApi.fetch('/status');
      status = data.data.status;
      token = data.data.jwt || '';
    } catch (error) {
      console.warn(error);
    }
    context.commit(UserMutationsType.SET_LOGIN_STATUS, status);
    context.commit(UserMutationsType.SET_TOKEN, token);
  },
};

/* 하단은 건들지 마시오 */
export type UserActionContext = {
  commit<K extends keyof UserMutations>(
    key: K,
    payload?: Parameters<UserMutations[K]>[1],
  ): ReturnType<UserMutations[K]>;
} & Omit<ActionContext<UserState, RootState>, 'commit'>;

export type UserActions = typeof userActions;
