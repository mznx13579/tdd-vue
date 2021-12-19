<template>
  <div class="change-password-wrapper">
    <article class="change-password-form">
      <h2 class="change-password-form-title">비밀번호 변경</h2>
      <table class="change-password-form-table">
        <colgroup>
          <col width="125px" />
          <col width="275px" />
        </colgroup>
        <tbody>
          <tr>
            <td class="category">기존 비밀번호</td>
            <td>
              <hw-input v-model="oldPassword" type="password" placeholder="기존 비밀번호를 입력하세요." />
            </td>
          </tr>
          <tr>
            <td class="category">새 비밀번호</td>
            <td>
              <hw-input v-model="newPassword" type="password" placeholder="새로운 비밀번호를 입력하세요." />
            </td>
          </tr>
          <tr>
            <td class="category">새 비밀번호 확인</td>
            <td>
              <hw-input v-model="recheckNewPassword" type="password" placeholder="새로운 비밀번호를 다시 입력하세요." />
            </td>
          </tr>
        </tbody>
      </table>
      <hw-button type="primary" @click="changePassword">변경</hw-button>
    </article>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import authApi from '@/api/authApi';
import common from '@/common';
import { StatusCode, ToastType } from '@/types/common';
import { ChangePasswordForm } from './types';

export default Vue.extend({
  name: 'ChangePassword',

  data() {
    return {
      oldPassword: '',
      newPassword: '',
      recheckNewPassword: '',
    };
  },

  methods: {
    async changePassword() {
      if (!this.changePasswordPrechecker()) {
        return;
      }

      const changePasswordData: ChangePasswordForm = {
        old: this.oldPassword,
        new: this.newPassword,
        new_confirm: this.recheckNewPassword,
      };

      try {
        //! 실제 비밀번호 변경 로직 동작하지 않도록 임시로 주석 처리함
        // this.$eventHub.$emit(this.HW_EVENT_NAMES.LOCK_SCREEN_PROCESS, true);

        // const { data } = await authApi.create<ChangePasswordForm>('/change-password', changePasswordData);
        // const status = data?.data?.status;

        // this.$eventHub.$emit(this.HW_EVENT_NAMES.LOCK_SCREEN_PROCESS, false);

        // if (!status || status !== StatusCode.SUCCESS_LOGIN) {
        //   this.$eventHub.$emit(this.HW_EVENT_NAMES.TOAST_EVENT, {
        //     message: '비밀번호 변경을 다시 시도해주세요.',
        //     type: ToastType.ERROR,
        //   });
        //   return;
        // }

        alert('[success!] 비밀번호 변경 API 연동은 추후 진행 예정');

        this.$eventHub.$emit(this.HW_EVENT_NAMES.TOAST_EVENT, {
          message: '비밀번호가 정상적으로 변경되었습니다. 다시 로그인해주세요.',
        });
        this.$router.push({ name: 'LoginForm' });
      } catch (error) {
        this.$eventHub.$emit(this.HW_EVENT_NAMES.LOCK_SCREEN_PROCESS, false);
        console.warn(error);

        this.$eventHub.$emit(this.HW_EVENT_NAMES.TOAST_EVENT, {
          message: common.showErrorMessage(error),
          type: ToastType.ERROR,
        });
      }
    },

    changePasswordPrechecker() {
      if (this.oldPassword.trim() === '') {
        alert('기존 비밀번호를 작성해주세요.');
        return false;
      }

      if (this.newPassword.trim() === '') {
        alert('새로운 비밀번호를 작성해주세요.');
        return false;
      }

      if (this.recheckNewPassword.trim() === '') {
        alert('재확인용 새로운 비밀번호를 작성해주세요.');
        return false;
      }

      if (this.oldPassword === this.newPassword) {
        alert('새 비밀번호가 기존 비밀번호와 일치합니다. 다른 새로운 비밀번호를 작성해주세요.');
        return false;
      }

      if (this.newPassword !== this.recheckNewPassword) {
        alert('새 비밀번호가 서로 일치하지 않습니다. 다시 확인해주세요.');
        return false;
      }

      return true;
    },
  },
});
</script>

<style lang="scss" scoped>
.change-password-wrapper {
  background: #f3f2f0;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  text-align: center;
}

.change-password-form {
  font-size: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 400px;

  &-title {
    font-size: 2.5em;
    font-weight: 600;
    margin-bottom: 0.5em;

    @include mq('tablet-portrait') {
      font-size: 3em;
    }
  }

  &-table {
    margin-bottom: 0.75em;

    td {
      padding: 0.25em 0;

      &.category {
        font-size: 1.5em;
      }
    }
  }
}
</style>
