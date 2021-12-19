<template>
  <div class="gnb-container">
    <el-popover trigger="click" placement="bottom" popper-class="gnb-menu" :visible-arrow="false">
      <GnbMenuList />
      <button slot="reference" type="button" class="gnb-button" :class="{ active: showGnb }">
        <a href="javascript:void(0)" class="pb-2 pr-10">오피스홈</a>
        <i class="gis gi-short-arrow-down" style="color: #909090; font-size: 10px"></i>
      </button>
    </el-popover>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import GnbMenuList from '@/components/Header/GnbMenuList.vue';

export default Vue.extend({
  name: 'GnbMenu',
  components: {
    GnbMenuList,
  },
  data() {
    return {
      showGnb: false,
    };
  },
});
</script>

<style lang="scss" scoped>
.gnb-container {
  width: 100%;
}
.gnb-button {
  display: flex;
  align-items: center;
  color: $gray-dark;
  span {
    font-size: 1.125rem;
  }
}
</style>
