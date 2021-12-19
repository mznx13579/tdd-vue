<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'EmptyLayout',
});
</script>

<style lang="scss" scoped></style>
