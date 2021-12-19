import { contactApiInstance } from '@/api/config/instance';
import { AxiosPromise, AxiosRequestConfig } from 'axios';

const authRequestHeader = {
  accept: 'application/json',
  'Content-Type': 'application/json',
};

const authApi = {
  fetch(target: string, options: AxiosRequestConfig = {}): AxiosPromise<any> {
    return contactApiInstance({ ...options, headers: authRequestHeader }).get(target);
  },
  create<RequestPayload>(target: string, data: RequestPayload, options: AxiosRequestConfig = {}): AxiosPromise<any> {
    return contactApiInstance({ ...options, headers: authRequestHeader }).post(target, data);
  },
};

export default authApi;
