<template>
  <div class="home">
    <div class="welcome">
      <p class="welcome__title">루팡 계산기</p>
      <p class="welcome__desc">재미로 하는 거에요!</p>
      <button class="welcome__button" @click="goToNext">Start</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Home',
  methods: {
    goToNext() {
      this.$router.push('/money');
    },
  },
});
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  .welcome {
    display: flex;
    flex-direction: column;
    align-items: center;

    &__title {
      font-size: 3rem;
    }

    &__desc {
      font-size: 1.5rem;
      padding: 20px 0;
    }

    &__button {
      height: 50px;
      width: 50%;
      font-size: 1.2rem;
      color: #efefef;
      background-color: rgba($color: #fff, $alpha: 0.2);
      border-radius: 10px;
      box-shadow: 5px 5px 5px #f9f871;
    }
    &__button:hover {
    }
  }
}
</style>
