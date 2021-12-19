<template>
  <div class="register-qrcode-wrapper">
    <QRCodeImage :qrCodeTemplate="qrCodeTemplate" :isFetchComplete="isShowRegisterForm" />
    <RegisterQRCodeForm v-if="isShowRegisterForm" @reigsterOTP="reigsterOTP" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import authApi from '@/api/authApi';
import common from '@/common';
import { StatusCode, ToastType } from '@/types/common';
import QRCodeImage from '@/components/OTP/QRCodeImage.vue';
import RegisterQRCodeForm from '@/components/OTP/RegisterQRCodeForm.vue';
import { OTPForm } from './types';

export default Vue.extend({
  name: 'RegisterQRCode',

  components: {
    QRCodeImage,
    RegisterQRCodeForm,
  },

  data() {
    return {
      qrCodeTemplate: '',
      isShowRegisterForm: false,
    };
  },

  created() {
    this.fetchQRCode();
  },

  methods: {
    async fetchQRCode() {
      try {
        const { data } = await authApi.fetch('/otp/generate-qrcode');

        this.qrCodeTemplate = data;
        this.isShowRegisterForm = true;
      } catch (error) {
        console.warn(error);

        this.$eventHub.$emit(this.HW_EVENT_NAMES.TOAST_EVENT, {
          message: common.showErrorMessage(error),
          type: ToastType.ERROR,
        });
      }
    },

    async reigsterOTP(secretCode: string) {
      const registerPayload: OTPForm = {
        token: secretCode,
      };

      try {
        this.$eventHub.$emit(this.HW_EVENT_NAMES.LOCK_SCREEN_PROCESS, true);

        const { data } = await authApi.create<OTPForm>('/otp/registration', registerPayload);
        const status = data?.data?.status;

        this.$eventHub.$emit(this.HW_EVENT_NAMES.LOCK_SCREEN_PROCESS, false);

        if (!status || status !== StatusCode.SUCCESS_LOGIN) {
          this.$eventHub.$emit(this.HW_EVENT_NAMES.TOAST_EVENT, {
            message: 'OTP 등록 과정을 다시 시도해주세요.',
            type: ToastType.ERROR,
          });
          return;
        }

        this.$eventHub.$emit(this.HW_EVENT_NAMES.TOAST_EVENT, { message: '환영합니다.' });
        this.$router.push({ name: 'Home' });
      } catch (error) {
        this.$eventHub.$emit(this.HW_EVENT_NAMES.LOCK_SCREEN_PROCESS, false);
        console.warn(error);

        this.$eventHub.$emit(this.HW_EVENT_NAMES.TOAST_EVENT, {
          message: common.showErrorMessage(error),
          type: ToastType.ERROR,
        });
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.register-qrcode-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 400px;
}
</style>
