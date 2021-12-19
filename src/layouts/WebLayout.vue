<template>
  <div>
    <Header />
    <div class="split-wrap">
      <Sidebar />
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Header from '@/components/layoutElements/Header.vue';
import Sidebar from '@/components/layoutElements/Sidebar.vue';

export default Vue.extend({
  name: 'WebLayout',
  components: { Header, Sidebar },
});
</script>

<style lang="scss" scoped>
.split-wrap {
  position: absolute;
  height: calc(100% - #{$headerHeight});
  top: $headerHeight;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  @include clearfix();
}
</style>
