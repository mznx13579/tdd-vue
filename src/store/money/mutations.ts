import { MoneyState } from './state';

export enum MoneyMutationsType {
  SET_LOGIN_STATUS = 'Money/SET_LOGIN_STATUS',
  SET_TOKEN = 'Money/SET_TOKEN',
}

export const moneyMutations = {
  [MoneyMutationsType.SET_LOGIN_STATUS](state: MoneyState, status: number) {
    state.loginStatus = status;
  },
  [MoneyMutationsType.SET_TOKEN](state: MoneyState, token: string) {
    state.token = token;
  },
};

export type MoneyMutations = typeof moneyMutations;
