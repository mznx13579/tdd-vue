<template>
  <div class="otp-wrapper">
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'OTP',
});
</script>

<style lang="scss" scoped>
.otp-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #f3f2f0;
  text-align: center;
}
</style>
