import HwUtils from '@/utils/index';

//! api service 별로 공통 인스턴스화 작업
export function authApiInstance(options = {}) {
  return HwUtils.instance.create({ service: 'AUTH' }, options);
}

export function contactApiInstance(options = {}) {
  return HwUtils.instance.create({ service: 'CONTACT' }, options);
}
