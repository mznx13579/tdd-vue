<template>
  <el-dialog
    custom-class="md"
    width="400px"
    :visible.sync="isDialog"
    :append-to-body="true"
    :close-on-click-modal="false"
  >
    <div slot="title" class="modal-title">
      {{ $t('존재하지 않는 페이지') }}
    </div>
    <div>{{ $t('존재하지 않는 경로 입니다.') }}<br />{{ $t('이전으로 돌아가거나 홈으로 이동합니다.') }}</div>
    <span slot="footer" class="dialog-footer">
      <div>
        <hw-button type="secondary" @click="$router.go(-1)">{{ $t('이전으로 돌아가기') }}</hw-button>
        <hw-button type="primary" @click="rootRedirect">{{ $t('홈으로 가기') }}</hw-button>
      </div>
    </span>
  </el-dialog>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'NotFound',

  data() {
    return {
      isDialog: true,
    };
  },

  methods: {
    rootRedirect() {
      window.location.href = `${process.env.VUE_APP_DEFAULTPATH}/`;
    },
  },
});
</script>
