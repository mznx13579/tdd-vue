<template>
  <header class="header">
    <div class="wrap-container">
      <div class="logo-container">
        <a href="">
          <img class="logo" src="https://static.hiworks.com/independent/hiworks-logo.svg" alt="logo" />
        </a>
      </div>
      <GnbMenu />
      <AccountInformationView :account-information="loginAccount" @logout="logout" />
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue';
import GnbMenu from '@/components/Header/GnbMenu.vue';
import AccountInformationView from '@/components/Header/AccountInformationView.vue';
import { HttpStatusCode, ToastType } from '@/types/common';
import common from '@/common';
import authApi from '@/api/authApi';
import { AccountInformation } from './types';

export default Vue.extend({
  name: 'Header',
  components: { GnbMenu, AccountInformationView },
  computed: {
    loginAccount(): AccountInformation {
      return this.$store.getters['User/GET_DECODE_TOKEN'];
    },
  },
  methods: {
    async logout() {
      try {
        const { status } = await authApi.fetch('/logout');

        if (status === HttpStatusCode.NO_CONTENT) {
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
.header {
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 0 24px;
  height: $headerHeight;
  border-bottom: 1px solid #e0e0e0;
}
.wrap-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: $headerHeight - 1px;
}
.logo-container {
  margin-right: 14px;
  .logo {
    width: auto;
    height: 16px;
  }
}
.gnb-button {
  display: flex;
  align-items: center;
  color: $gray-dark;
  span {
    font-size: 1.25rem;
  }
  &:before {
    content: url('https://static.hiworks.com/independent/menu-icon.svg');
    height: 36px;
  }
}
</style>

<style lang="scss">
.el-popover {
  transition: opacity 0.08s ease-in-out;
  min-width: auto;

  padding: 0;
  margin: 0;

  top: $headerHeight - 1px !important;

  background: #fff;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  border: 1px solid #aeaeae;
  border-radius: 4px;

  //! gnb: 메뉴
  //! gnb: 사용자 정보
  &.account-detail {
    width: 310px;
    padding: 20px 20px 12px 20px;
    margin-top: 0;
    .account-info-wrap {
      padding-bottom: 20px;
      border-bottom: 1px solid $secondary-color-hover;
      .account-info {
        width: calc(100% - 100px);
        margin: 13px 0 0 25px;
      }
      .user-name {
        font-size: 1rem;
        font-weight: 600;
      }
      .user-email {
        font-size: 0.875rem;
        margin-top: 8px;
        font-weight: 500;
      }
    }
  }

  &.gnb-menu {
    margin-top: 0;
    left: 115px !important;
  }
}
</style>
