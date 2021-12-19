<template>
  <div class="service-menu">
    <ul class="service-menu-list">
      <li v-for="(menuItem, i) in menuList" :key="'menu-list-' + i" class="service-menu-item">
        <a :href="menuItem.link" class="service-menu-link">
          <div class="service-menu-icon" v-html="menuItem.icon"></div>
          <span class="service-menu-title">{{ menuItem.name }}</span>
          <span v-if="menuItem.badge > 0" class="service-menu-badge">{{ badgeCount(menuItem.badge) }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { menuList } from '@/components/Header/menuList';

export default Vue.extend({
  name: 'Name',
  data() {
    return {
      menuList,
    };
  },
  methods: {
    badgeCount(count: number): string {
      return count > 999 ? '999+' : count.toString();
    },
  },
});
</script>

<style lang="scss" scoped>
.service-menu {
  width: 358px;
  padding: 20px;
}

.service-menu-list {
  display: flex;
  flex-wrap: wrap;
}

.service-menu-item {
  width: calc(50% - 15px);
  margin-right: 15px;
  padding: 7px 0 6px 10px;
  .service-menu-link {
    display: flex;
    align-items: center;
  }
  .service-menu-icon {
    padding-top: 5px;
    margin-right: 10px;
  }

  &:hover {
    background: #f1f4fb;
    ::v-deep .svg-hover-color {
      fill: #2985db;
    }
  }
}

.service-menu-badge {
  height: 16px;
  margin: 2px 0 0 5px;
  padding: 0 5px;
  border-radius: 50px;
  background: #2985db;
  font-size: 11px;
  color: #ffffff;
}
</style>
