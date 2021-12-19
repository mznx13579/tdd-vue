import { AxiosInstance } from 'axios';

function setInterceptors(instance: AxiosInstance) {
  instance.interceptors.request.use(
    config => config,
    error => Promise.reject(error.response),
  );
  instance.interceptors.response.use(
    config => config,
    error => Promise.reject(error.response),
  );
  return instance;
}

export { setInterceptors };
