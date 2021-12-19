import { UserState } from './state';

export enum UserMutationsType {
  SET_LOGIN_STATUS = 'User/SET_LOGIN_STATUS',
  SET_TOKEN = 'User/SET_TOKEN',
}

export const userMutations = {
  [UserMutationsType.SET_LOGIN_STATUS](state: UserState, status: number) {
    state.loginStatus = status;
  },
  [UserMutationsType.SET_TOKEN](state: UserState, token: string) {
    state.token = token;
  },
};

export type UserMutations = typeof userMutations;
