<template>
  <div>
    <slot />
    <Footer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Footer from '@/components/layoutElements/Footer.vue';

export default Vue.extend({
  name: 'WebLayout',
  components: { Footer },
});
</script>

<style scoped></style>
