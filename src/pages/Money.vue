<template>
  <div class="money">
    <p class="money__title">연봉을 입력해 주세요!</p>
    <input />
    <p class="warning-message">연봉을 입력해야 해요!</p>
    <button class="next-button">다음!</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({});
</script>

<style lang="scss" scoped>
.money {
  color: #000;
  font-size: 4rem;
  font-weight: 700;
  display: flex;
  flex-direction: column;
}
</style>
