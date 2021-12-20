import axios from 'axios';
import { setInterceptors } from './interceptors';
import { environment } from '../environment';
import { cookie } from '../cookie';

interface ApiCommonInfo {
  service: string;
  endPoint?: string;
}

//* 공통 기본 header config
const baseHeaders = {
  'Content-Type': 'application/vnd.api+json',
  Accept: 'application/vnd.api+json',
};

//* axios request시 headers로 어떤 config 값이 들어갈지 결정하는 로직
const selectRequestHeader = (options: any) => {
  return options.hasOwnProperty('headers') ? options.headers : baseHeaders;
};

//* axios request url 앞 부분 설정하는 부분
const getBaseUrl = ({ service, endPoint }: ApiCommonInfo) => {
  return environment.getApiUrlFromEnv(service) + (endPoint ? `/${endPoint}` : '');
};

//* axios 공통 기본 config object 만드는 부분
const baseAxiosConfig = (baseURL: string, headers: any) => {
  return {
    baseURL,
    headers,
    withCredentials: true,
  };
};

const instance = {
  create(apiCommonInfo: ApiCommonInfo, options: any = {}) {
    const headers = selectRequestHeader(options);
    if (options.hasOwnProperty('headers')) {
      delete options.headers;
    }
    const instance = axios.create({ ...baseAxiosConfig(getBaseUrl(apiCommonInfo), headers), ...options });
    return setInterceptors(instance);
  },
  createWithAuth(apiCommonInfo: ApiCommonInfo, options: any = {}) {
    const headers = selectRequestHeader(options);
    if (options.hasOwnProperty('headers')) {
      delete options.headers;
    }
    const authHeaders = {
      ...headers,
      Authorization: `Hiworks ${cookie.getCookie('PHPSESSID')}`,
    };
    const instance = axios.create({ ...baseAxiosConfig(getBaseUrl(apiCommonInfo), authHeaders), ...options });
    return setInterceptors(instance);
  },
};

export { instance };
