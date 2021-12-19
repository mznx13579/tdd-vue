<template>
  <div class="set-security-level-wrapper">
    <p class="set-security-level-message">
      로그인 후 IP주소가 변경되는 경우, 현재 IP와 최근 로그인한 IP 정보를 확인해서 타인이 로그인 정보를 부정하게
      사용하는 것을 방지하는 로그인 보안 서비스입니다.
    </p>
    <a href="https://customer.gabia.com/manual/hiworks/117/1760" target="_blank" rel="noopener noreferrer">
      자세히보기
    </a>
    <el-radio-group v-model="selectedSecurityLevel" class="security-level-select">
      <el-radio v-for="securityLevel in securityLevels" :key="securityLevel.value" :label="securityLevel.value">
        {{ securityLevel.label }}
      </el-radio>
    </el-radio-group>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'SetSecurityLevel',

  data() {
    return {
      selectedSecurityLevel: '1',
      securityLevels: [
        {
          label: '사용 안 함',
          value: '0',
        },
        {
          label: '1단계- 로그인한 IP대역과 동일한 경우(C클래스)만 로그인 유지',
          value: '1',
        },
        {
          label: '2단계- 로그인 후 IP 주소가 변경되지 않는 경우에만 로그인 유지',
          value: '2',
        },
      ],
    };
  },

  watch: {
    $attrs() {
      this.selectedSecurityLevel = this.$attrs.selectedSecurityLevel;
    },

    selectedSecurityLevel() {
      this.sendPayload();
    },
  },

  methods: {
    sendPayload() {
      this.$eventHub.$emit(this.HW_EVENT_NAMES.SEND_DIALOG_EMIT_PAYLOAD, {
        setSecurityLevel: this.selectedSecurityLevel,
      });
    },
  },
});
</script>

<style lang="scss" scoped>
.set-security-level-wrapper {
  .set-security-level-message {
    margin-bottom: 10px;
  }

  a {
    display: block;
    margin-bottom: 30px;
    width: 80px;
    color: #779ec0;
  }

  .security-level-select {
    label {
      display: block;
      padding-bottom: 10px;
    }
  }
}
</style>
