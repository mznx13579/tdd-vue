import jwtDecode from 'jwt-decode';
import { MoneyState } from './state';
import { DecodeToken } from './types';

export enum MoneyGettersType {
  GET_LOGIN_STATUS = 'Money/GET_LOGIN_STATUS',
  GET_TOKEN = 'Money/GET_TOKEN',
  GET_DECODE_TOKEN = 'Money/GET_DECODE_TOKEN',
}

export const moneyGetters = {
  [MoneyGettersType.GET_LOGIN_STATUS](state: MoneyState) {
    return state.loginStatus;
  },
  [MoneyGettersType.GET_TOKEN](state: MoneyState) {
    return state.token;
  },
  [MoneyGettersType.GET_DECODE_TOKEN](state: MoneyState): DecodeToken {
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

export type MoneyGetters = typeof moneyGetters;
