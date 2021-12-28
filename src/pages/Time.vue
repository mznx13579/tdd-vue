<template>
  <div class="time">
    <div class="food-list"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

interface Food {
  name: string;
}

/**
 * 계산식 : 연봉(만원단위 x) / 260일 * 10000 / 32400초
 * 1일에 9시간 1년에 260일
 */
export default Vue.extend({
  name: 'Time',
  data() {
    return {
      money: 0 as number,
    };
  },
  created() {
    const localMoney = window.localStorage.getItem('money');
    localMoney ? (this.money = Number(localMoney)) : 4300;
  },
});
</script>

<style scoped></style>
