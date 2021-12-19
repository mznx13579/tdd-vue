import jwtDecode from 'jwt-decode';
import { UserState } from './state';
import { DecodeToken } from './types';

export enum UserGettersType {
  GET_LOGIN_STATUS = 'User/GET_LOGIN_STATUS',
  GET_TOKEN = 'User/GET_TOKEN',
  GET_DECODE_TOKEN = 'User/GET_DECODE_TOKEN',
}

export const userGetters = {
  [UserGettersType.GET_LOGIN_STATUS](state: UserState) {
    return state.loginStatus;
  },
  [UserGettersType.GET_TOKEN](state: UserState) {
    return state.token;
  },
  [UserGettersType.GET_DECODE_TOKEN](state: UserState): DecodeToken {
    const initDecodeToken = {
      access_ip: '0.0.0.0',
      o: 0,
      o_name: '',
      type: '',
      u: 0,
      u_config: 0,
      u_id: '',
      u_lang: '',
      u_level: '',
      u_name: '',
      u_tz: '',
    };

    return state.token === '' ? initDecodeToken : jwtDecode(state.token);
  },
};

export type UserGetters = typeof userGetters;
