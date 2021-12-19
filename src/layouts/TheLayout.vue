<template>
  <component :is="layout" v-show="routerReady">
    <slot />
  </component>
</template>

<script lang="ts">
import Vue from 'vue';

const DEFAULT_LAYOUT = 'default';

export default Vue.extend({
  name: 'TheLayout',

  data() {
    return {
      routerReady: false,
    };
  },

  computed: {
    layout() {
      return `${this.$route.meta?.layout || DEFAULT_LAYOUT}-layout`;
    },
  },

  created() {
    this.$router.onReady(this.renderPermission);
  },

  methods: {
    renderPermission() {
      this.routerReady = true;
    },
  },
});
</script>

<style scoped></style>
