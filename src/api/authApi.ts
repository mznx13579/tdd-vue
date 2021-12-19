import { authApiInstance } from '@/api/config/instance';
import { AxiosPromise, AxiosRequestConfig } from 'axios';

const authRequestHeader = {
  accept: 'application/json',
  'Content-Type': 'application/json',
};

const authApi = {
  fetch(target: string, options: AxiosRequestConfig = {}): AxiosPromise<any> {
    return authApiInstance({ ...options, headers: authRequestHeader }).get(target);
  },
  create<RequestPayload>(target: string, data: RequestPayload, options: AxiosRequestConfig = {}): AxiosPromise<any> {
    return authApiInstance({ ...options, headers: authRequestHeader }).post(target, data);
  },
};

export default authApi;
