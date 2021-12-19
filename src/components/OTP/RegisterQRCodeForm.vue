<template>
  <form class="register-form" @submit.prevent="registerOTP">
    <h2 class="register-form-title">OTP Secret Code 등록</h2>
    <div class="register-form-wrapper">
      <hw-input v-model="secretCode" placeholder="코드를 입력하세요." @enter="registerOTP" />
      <hw-button type="primary" @click="registerOTP">등록</hw-button>
    </div>
  </form>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'RegisterQRCodeForm',

  data() {
    return {
      secretCode: '',
    };
  },

  methods: {
    registerOTP() {
      if (this.secretCode.trim() === '') {
        alert('OTP Code를 입력하세요.');
        return;
      }

      this.$emit('reigsterOTP', this.secretCode);
    },
  },
});
</script>

<style lang="scss" scoped>
.register-form {
  font-size: 10px;

  &-title {
    font-size: 2.5em;
    font-weight: 600;
    margin-bottom: 0.5em;

    @include mq('tablet-portrait') {
      font-size: 3em;
    }
  }

  &-wrapper {
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    width: 350px;

    input {
      flex-grow: 1;
      margin-right: 10px;
    }
  }
}
</style>
