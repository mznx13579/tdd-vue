<template>
  <div>{{ contactList }}</div>
</template>

<script lang="ts">
import Vue from 'vue';
import contactApi from '@/api/contactApi';
import HwUtils from '@/utils/index';

import { RequestPayLoad } from '@/types/common';
import { Contact } from '@/pages/types';

export default Vue.extend({
  name: 'Contact',
  components: {},
  props: {},
  data() {
    return {
      contactList: [] as Array<Contact>,
    };
  },
  computed: {},
  watch: {},
  // beforeCreate() {},
  // created() {},
  // beforeMount() {},
  mounted() {
    this.fetchContact();
  },
  // beforeUpdate() {},
  // updated() {},
  // beforeDestroy() {},
  // destroyed() {},
  methods: {
    async fetchContact() {
      try {
        const params = { ...HwUtils.api.getQueryParams('filter', { type: 'PUBLIC' }) };
        const payload = (await contactApi.fetch('/contacts', { params })) as RequestPayLoad<Contact>;
        console.log(payload);
        this.contactList = payload.data;
      } catch (error) {
        console.warn(error);
        this.$eventHub.$emit(this.HW_EVENT_NAMES.TOAST_EVENT, {
          message: '주소록을 가져오는 도중 오류가 발생했습니다.',
          type: 'error',
        });
      }
    },
  },
});
</script>

<style lang="scss" scoped></style>
