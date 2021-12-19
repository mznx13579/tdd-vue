<template>
  <el-dialog
    :custom-class="size"
    :class="setNoDialogHeader"
    :width="dialogWidth"
    :visible.sync="isDialog"
    :append-to-body="true"
    :close-on-click-modal="false"
    @opened="openDialog"
    @closed="closeDialog"
  >
    <!-- dialog title -->
    <div v-if="title.length > 0" slot="title" class="modal-title">{{ title }}</div>

    <!-- dialog contents -->
    <section class="dialog-contents" :class="setFontBoldStyle">
      <slot />
    </section>

    <!-- dialog footer -->
    <span slot="footer" class="dialog-footer">
      <div class="dialog-footer-wrapper">
        <hw-button
          v-for="(button, index) in footerButtons"
          :key="`btn-${index}`"
          :type="button.type"
          @click="emitEvent(button.emitEvent)"
        >
          {{ button.text }}
        </hw-button>
      </div>
    </span>
  </el-dialog>
</template>

<script lang="ts">
import { BaseObject } from '@/types/common';
import Vue, { PropType } from 'vue';
import { FooterButton } from './types';

export default Vue.extend({
  name: 'Dialog',

  props: {
    size: {
      type: String,
      default: 'md',
    },

    width: {
      type: Number,
      default: 0,
    },

    isDialog: {
      type: Boolean,
      default: false,
    },

    title: {
      type: String,
      default: '',
    },

    footerButtons: {
      type: Array as PropType<FooterButton[]>,
      default: [],
    },
  },

  data() {
    return {
      payload: {} as BaseObject,
    };
  },

  computed: {
    dialogWidth(): string {
      return !this.width ? '' : `${this.width}px`;
    },

    setNoDialogHeader(): string {
      return !this.title.length ? 'no-dialog-header' : '';
    },

    setFontBoldStyle(): string {
      return !this.title.length ? 'font-size-15 font-weight-bold' : '';
    },
  },

  created() {
    this.$eventHub.$on(this.HW_EVENT_NAMES.SEND_DIALOG_EMIT_PAYLOAD, this.sendEmitPayload);
  },

  destroyed() {
    this.$eventHub.$on(this.HW_EVENT_NAMES.SEND_DIALOG_EMIT_PAYLOAD, this.sendEmitPayload);
  },

  methods: {
    openDialog() {
      console.log('open dialog');
    },

    closeDialog() {
      this.payload = {};
    },

    emitEvent(name: string) {
      this.$emit(name, this.payload[name]);
    },

    sendEmitPayload(emitPayload: BaseObject) {
      this.payload = { ...this.payload, ...emitPayload };
    },
  },
});
</script>

<style lang="scss" scoped>
.no-dialog-header {
  ::v-deep {
    .el-dialog__header {
      display: none;
    }

    .el-dialog__body {
      padding-top: 0 !important;
    }
  }
}
</style>
