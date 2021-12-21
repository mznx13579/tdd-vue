import { ActionContext } from 'vuex';
import { RootState } from '@/store/types';
import authApi from '@/api/authApi';
import { MoneyMutations, MoneyMutationsType } from './mutations';
import { MoneyState } from './state';

export enum MoneyActionsType {
  FETCH_STATUS = 'Money/FETCH_STATUS',
}

export const moneyActions = {
  async [MoneyActionsType.FETCH_STATUS](context: MoneyActionContext) {
    let status = 0;
    let token = '';
    try {
      const { data } = await authApi.fetch('/status');
      status = data.data.status;
      token = data.data.jwt || '';
    } catch (error) {
      console.warn(error);
    }
    context.commit(MoneyMutationsType.SET_LOGIN_STATUS, status);
    context.commit(MoneyMutationsType.SET_TOKEN, token);
  },
};

/* 하단은 건들지 마시오 */
export type MoneyActionContext = {
  commit<K extends keyof MoneyMutations>(
    key: K,
    payload?: Parameters<MoneyMutations[K]>[1],
  ): ReturnType<MoneyMutations[K]>;
} & Omit<ActionContext<MoneyState, RootState>, 'commit'>;

export type MoneyActions = typeof moneyActions;
