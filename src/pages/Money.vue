<template>
  <div class="money">
    <p class="money__title" :class="{ 'warning-message': showAlert }">{{ moneyTitleDesc }}</p>
    <div v-if="!showDesc" class="money__wrap">
      <input v-model.number="money" class="money__wrap--input" />
      <span class="money__wrap--unit">만원</span>
    </div>
    <div v-else class="money__wrap">
      <p class="money__wrap--unit">{{ `${money}만원` }}</p>
    </div>
    <button v-if="!showDesc" class="next-button" @click="goNext">다음!</button>
    <button v-else class="next-button" @click="confirm">확인!</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Money',
  data() {
    return {
      money: 0 as number,
      showAlert: false as boolean,
      moneyTitleDesc: '연봉을 입력해 주세요!' as string,
      showDesc: false as boolean,
    };
  },

  methods: {
    goNext() {
      if (this.money === 0) {
        this.showAlert = true;
        this.moneyTitleDesc = '!연봉을 입력해야 해요!';
        return;
      }
      this.showDesc = true;
      this.moneyTitleDesc = '연봉은!';
    },

    confirm() {
      console.log('comfirm');
    },
  },
});
</script>

<style lang="scss" scoped>
.money {
  color: #000;
  font-size: 4rem;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__title.warning-message {
    color: #cdfb86;
  }
  &__wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    &--input {
      color: #676767;
      width: 300px;
    }
    &--unit {
      font-size: 3rem;
    }
  }
}
</style>
