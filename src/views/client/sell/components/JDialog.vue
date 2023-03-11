<template>
  <el-dialog v-bind="$attrs" v-on="$listeners" :custom-class="!headerLine ? 'header-line-none' : ''" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
    <div class="header" slot="title">
      <div class="title">{{ $attrs.title }}</div>
      <SvgIcon class="close" iconClass="dialog-close" plain @click="onClose"></SvgIcon>
    </div>
    <slot></slot>
  </el-dialog>
</template>

<script>
export default {
  name: 'JDialog',
  props: {
    headerLine: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    onClose() {
      this.$emit('update:visible', false);
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.title {
  font-size: 18px;
  color: $titleColor;
  line-height: 24px;
}
.close {
  cursor: pointer;
}
::v-deep {
  .el-dialog__header {
    position: relative;
    padding: 16px 24px;
    &::after {
      position: absolute;
      left: 0;
      bottom: 0;
      content: ' ';
      width: 100%;
      height: 1px;
      background-color: #f0f0f0;
    }
  }
  .header-line-none {
    .el-dialog__body {
      padding-top: 0;
    }
    .el-dialog__header {
      padding-bottom: 0;
      &::after {
        display: none;
      }
    }
  }
}
</style>
