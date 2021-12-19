<template>
  <div id="app">
    <Loading :isLoading="screenLock" :message="screenLockMessage" />
    <TheLayout>
      <router-view />
    </TheLayout>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Loading from '@/components/Loading.vue';
import TheLayout from '@/layouts/TheLayout.vue';
import { ToastType, ToastEvent } from '@/types/common';

export default Vue.extend({
  name: 'App',
  components: { TheLayout, Loading },
  props: {},
  data() {
    return {
      userId: '',
      password: '',
      securityLevel: '0',
      screenLock: false,
      screenLockMessage: '',
    };
  },
  computed: {},
  watch: {},
  // beforeCreate() {},
  // created() {},
  // beforeMount() {},
  mounted() {
    this.$eventHub.$on(this.HW_EVENT_NAMES.TOAST_EVENT, this.showToast);
    this.$eventHub.$on(this.HW_EVENT_NAMES.LOCK_SCREEN_PROCESS, this.showScreenLock);
  },
  // beforeUpdate() {},
  // updated() {},
  // beforeDestroy() {},
  // destroyed() {},
  methods: {
    showToast(payload: ToastEvent) {
      const toastPayLoad = this._.cloneDeep(payload);

      toastPayLoad.type = toastPayLoad?.type || ToastType.SUCCESS;
      toastPayLoad.showClose = toastPayLoad?.showClose || true;
      toastPayLoad.duration = toastPayLoad?.duration || 3000;

      this.$message(toastPayLoad);
    },

    showScreenLock(visible: boolean, message = '') {
      this.screenLockMessage = visible ? message : '';
      this.screenLock = visible;
    },
  },
});
</script>

<style lang="scss"></style>
