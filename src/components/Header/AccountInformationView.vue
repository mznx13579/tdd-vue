<template>
  <div>
    <el-popover trigger="click" placement="bottom" popper-class="account-detail" :visible-arrow="false">
      <div class="account-info-wrap">
        <img
          src="https://static.hiworks.com/office/static/images/common/user-alt.svg"
          alt="프로필 이미지"
          class="photo-75"
        />
        <div class="account-info">
          <p class="user-name">{{ accountInformation.u_name }}</p>
          <p class="user-email">{{ accountInformation.u_id }}</p>
        </div>
      </div>
      <div class="account-setting-button">
        <div>
          <a href="" class="hw-button text pl-0">설정</a>
          <a href="https://www.hiworks.com/cs/download" target="_blank" class="hw-button text m-0">다운로드</a>
        </div>
        <a class="btn hw-button secondary color-333" @click="logout">로그아웃</a>
      </div>
      <button slot="reference" type="button" class="account-button">
        <img
          src="https://static.hiworks.com/office/static/images/common/user-alt.svg"
          alt="프로필 이미지"
          class="photo-36"
        />
      </button>
    </el-popover>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { AccountInformation } from './types';

export default Vue.extend({
  name: 'AccountInformationView',
  props: {
    accountInformation: {
      type: Object as PropType<AccountInformation>,
      default: () => ({
        access_ip: '-',
        o: 0,
        o_name: '-',
        type: '-',
        u: 0,
        u_config: 0,
        u_id: '-',
        u_lang: '-',
        u_level: '-',
        u_name: '-',
        u_tz: '-',
      }),
    },
  },
  methods: {
    logout() {
      this.$emit('logout');
    },
  },
});
</script>

<style lang="scss" scoped>
.hw-button {
  display: inline-block;
  background-color: $primary-color;
  border: 1px solid $primary-color-hover;
  color: #fff;
  padding: 5px 20px 6px;
  font-size: 14px;
  text-align: center;
  vertical-align: middle;
  transition-duration: 0.1s;
  user-select: none;
  white-space: nowrap;
  font-weight: 500;
  cursor: pointer;

  //hover
  &:hover,
  &:focus {
    color: #fff;
    background: $primary-color-hover;
    border-color: $primary-color-hover;
    outline: none;
  }

  //disabled
  &[disabled],
  &:disabled {
    cursor: default;
    opacity: 0.5;
    &:hover {
      background: $primary-color;
      border-color: $primary-color-hover;
    }
  }

  &.secondary {
    background-color: $secondary-color;
    border-color: $secondary-color-hover;
    color: #333;
    &:hover,
    &:focus {
      background-color: $secondary-color-hover;
      border-color: $secondary-color-hover;
    }
    //disabled
    &[disabled],
    &:disabled {
      &:hover {
        background: $secondary-color;
        border-color: $secondary-color-hover;
      }
    }
  }

  &.text {
    color: $primary-color !important;
    padding: 0 10px;
    background: transparent;
    border-color: transparent;
    //hover
    &:hover,
    &:focus {
      color: #66b1ff !important;
    }
    //disabled
    &[disabled],
    &:disabled {
      &:hover {
        color: $primary-color;
        background: transparent;
        border-color: transparent;
        opacity: 0.5;
      }
    }
  }

  //이웃하는 버튼 간격
  & + .hw-button {
    margin-left: 14px;
  }
}
.account-info-wrap {
  display: flex;
}
.account-setting-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
}
.account-button {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid transparent;
  overflow: hidden;
  outline: 0;
  transition-duration: 0.2s;
}

.photo {
  display: block;
  &-36 {
    width: 2.25rem;
    height: 2.25rem;
  }
  &-75 {
    width: 4.688rem;
    height: 4.688rem;
  }
}
</style>
