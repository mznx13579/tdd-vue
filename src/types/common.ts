import { VueConstructor } from 'vue';

type Identifiers = string | number;

export enum ToastType {
  'SUCCESS' = 'success',
  'WARNING' = 'warning',
  'ERROR' = 'error',
  'INFO' = 'info',
}

export enum StatusCode {
  NOT_LOGIN = 0,
  AVAILABLE_USE_AFTER_REGISTER_OTP = 1,
  WAIT_REGISTER_OTP = 2,
  AVAILABLE_USE_AFTER_CHANGE_PASSWAORD = 3,
  SUCCESS_LOGIN = 4,
}

export enum HttpStatusCode {
  OK = 200,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

export interface ToastEvent {
  message: string;
  type?: ToastType;
  showClose?: boolean;
  duration?: number;
}

export type RequestPayLoad<PayLoad> = {
  data: Array<PayLoad>;
  meta?: {
    total: number;
  };
};

export type BaseObject<CertainType = any> = { [Identifier in Identifiers]: CertainType };

export type CustomVueRefs<Element> = VueConstructor<Vue & { $refs: Element }>;
