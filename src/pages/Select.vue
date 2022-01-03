<template>
  <div class="select">
    <div class="select__list">
      <router-link class="select__list--item" to="stopwatch">start to 0</router-link>
      <router-link class="select__list--item" to="time">end to 0</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Select',
});
</script>

<style lang="scss" scoped>
.select {
  display: flex;
  &__list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &--item {
      display: flex;
      justify-content: center;
      align-items: center;
      color: black;
      background-color: white;
      border-radius: 10px;
      width: 200px;
      height: 50px;
      margin: 20px;
    }
  }
}
</style>
