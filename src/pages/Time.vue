<template>
  <div class="time">
    <div class="food-list">
      <div v-for="food in foodList" :key="`food-${food.index}`" class="food" @click="clickFood(food)">
        <p>{{ food.name }}</p>
        <p>{{ food.cost }}원</p>
      </div>
    </div>
    <p v-if="time">
      {{ time }}
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

interface Food {
  index: number;
  name: string;
  cost: number;
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
      foodList: [
        {
          index: 0,
          name: '햄버거',
          cost: 8000,
        },
        {
          index: 1,
          name: '치킨',
          cost: 20000,
        },
        {
          index: 2,
          name: '피자',
          cost: 28000,
        },
        {
          index: 3,
          name: '스테이크',
          cost: 82000,
        },
      ] as Food[],
      time: '',
    };
  },

  computed: {
    smallestUnit(): number {
      return ((this.money / 250) * 10000) / 32400;
    },
  },

  created() {
    const localMoney = window.localStorage.getItem('money');
    if (localMoney === null) {
      window.localStorage.setItem('money', '4300');
      this.money = Number(window.localStorage.getItem('money'));
    } else {
      this.money = Number(localMoney);
    }
  },

  methods: {
    clickFood(food: Food) {
      const foodToSecond = food.cost / this.smallestUnit;
      this.time = this.changeHourMinSec(foodToSecond);
    },

    changeHourMinSec(seconds: number): string {
      const hour = seconds / 3600 < 10 ? `0${Math.floor(seconds / 3600)}` : String(Math.floor(seconds / 3600));
      const min =
        (seconds % 3600) / 60 < 10
          ? `0${Math.floor((seconds % 3600) / 60)}`
          : String(Math.floor((seconds % 3600) / 60));
      const sec = seconds % 60 < 10 ? `0${Math.floor(seconds % 60)}` : String(Math.floor(seconds % 60));

      return `${hour}시간 ${min}분 ${sec}초`;
    },
  },
});
</script>

<style scoped lang="scss">
.time {
  .food-list {
    display: flex;
    flex-wrap: wrap;
    width: 40rem;

    .food {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1 1 40%;
      cursor: pointer;
    }
    .food:hover {
      background-color: yellowgreen;
    }
  }
}
</style>
