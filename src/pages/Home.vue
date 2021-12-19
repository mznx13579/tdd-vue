<template>
  <div class="home">
    <div class="login-user">
      현재 로그인한 유저<br />
      {{ loginUser }}<br />
      <hw-button type="info" size="sm" @click="openLogoutDialog">LOGOUT</hw-button>
    </div>
    <div class="home-title">
      <h2>임시 메인 페이지</h2>
      <small>(이동할 페이지를 선택하세요.)</small>
    </div>
    <ul class="page-list">
      <li class="page-list-item">
        <router-link to="/login">로그인 페이지</router-link>
      </li>
      <li class="page-list-item">
        <router-link to="/login/change-password">비밀번호 변경</router-link>
      </li>
      <li class="page-list-item">
        <router-link to="/otp/register-qrcode">OTP 등록용 QR Code 생성</router-link>
      </li>
      <li class="page-list-item">
        <router-link to="/otp/verify">OTP 검증 임시 페이지</router-link>
      </li>
      <li class="page-list-item">
        <router-link to="/mory">조직도 테스트</router-link>
      </li>
    </ul>
    <Dialog
      size="sm"
      :isDialog="isLogoutDialog"
      :footerButtons="logoutDialogButtons"
      @closeLogoutDialog="closeLogoutDialog"
      @logout="logout"
    >
      <span>정말로 로그아웃하시겠습니까?</span>
    </Dialog>
  </div>
</template>

<script lang="ts">
//! 메인 페이지인 Home.vue는 추후 구체적인 기획안이 나오면 바뀔 예정입니다.
//! 현재는 기본 작업을 원활하게 하기 위해 임시로 메인 페이지를 구성했습니다.
import Vue from 'vue';
import { HttpStatusCode, ToastType } from '@/types/common';
import common from '@/common';
import authApi from '@/api/authApi';
import Dialog from '@/components/Dialog.vue';

export default Vue.extend({
  name: 'Home',

  components: {
    Dialog,
  },

  data() {
    return {
      isLogoutDialog: false,
      logoutDialogButtons: [
        {
          type: 'secondary',
          text: this.$t('취소').toString(),
          emitEvent: 'closeLogoutDialog',
        },
        {
          type: 'info',
          text: this.$t('로그아웃').toString(),
          emitEvent: 'logout',
        },
      ],
    };
  },

  computed: {
    loginUser(): string {
      return this.$store.getters['User/GET_DECODE_TOKEN'].u_id;
    },
  },

  methods: {
    openLogoutDialog() {
      this.isLogoutDialog = true;
    },

    closeLogoutDialog() {
      this.isLogoutDialog = false;
    },

    async logout() {
      try {
        const { status } = await authApi.fetch('/logout');

        if (status === HttpStatusCode.NO_CONTENT) {
          this.closeLogoutDialog();

          this.$eventHub.$emit(this.HW_EVENT_NAMES.TOAST_EVENT, {
            message: '정상적으로 로그아웃 되었습니다.',
            type: ToastType.INFO,
          });

          setTimeout(() => window.location.reload(), 500);
        }
      } catch (error) {
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
.home {
  position: relative;
  font-size: 10px;
  border: 1px solid silver;
  text-align: center;
  padding: 1em;

  .login-user {
    position: absolute;
    right: 10px;
    font-size: 1.5em;
  }

  &-title {
    margin-bottom: 1.5em;

    h2 {
      font-size: 3em;
      font-weight: 600;
    }

    small {
      font-size: 1.25em;
      color: crimson;
    }
  }

  .page-list {
    font-size: 1.75em;

    &-item {
      padding: 0.5em 0;
      & + & {
        margin-top: 0.25em;
      }

      a {
        color: #2c86dc;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
