import { BaseObject } from '@/types/common';

const common = {
  showErrorMessage(errorData: BaseObject<any>) {
    return errorData?.data?.errors[0]?.msg || '오류가 발생했습니다. 새로고침하거나 다시 시도해주세요.';
  },
};

export default common;
