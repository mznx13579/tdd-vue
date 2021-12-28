<template>
  <div class="time">
    <div class="food-list">
      
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

interface Food {
  name: string;
}
export default Vue.extend({
  name: 'Time',
  data() {
    return {
      money: 0 as number,
      foodList:
    };
  },
  created() {
    const localMoney = window.localStorage.getItem('money');
    localMoney ? (this.money = Number(localMoney)) : 4300;
  },
});
</script>

<style scoped></style>
