<template>
  <section class="qrcode-section">
    <h2 class="qrcode-section-title">OTP 등록용 QR Code 생성</h2>
    <div class="qrcode-section-image">
      <template v-if="isFetchComplete">
        <div v-html="qrCodeTemplate" />
      </template>
      <template v-else>
        <p class="waiting-alert-message">QR Code를 불러오는 중입니다.<br />잠시만 기다려주세요.</p>
      </template>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'QRCodeImage',

  props: {
    qrCodeTemplate: {
      type: String,
      default: '',
      required: true,
    },

    isFetchComplete: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.qrcode-section {
  font-size: 10px;
  margin-bottom: 3em;

  &-title {
    font-size: 2.5em;
    font-weight: 600;
    margin-bottom: 0.5em;

    @include mq('tablet-portrait') {
      font-size: 3em;
    }
  }

  &-image {
    position: relative;
    margin: 0 auto;
    width: 212px;
    height: 212px;

    .waiting-alert-message {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      font-size: 1.5em;
      line-height: 2;
    }
  }
}
</style>
