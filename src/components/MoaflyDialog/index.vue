<template>
  <el-dialog v-bind="$attrs" v-on="$listeners" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
    <div class="header" slot="title">
      <div class="title">{{ $attrs.title }}</div>
      <img class="cursor" @click="onClose" :src="require('@/assets/svg/dialog-close.svg')" alt="" />
    </div>
    <slot></slot>
  </el-dialog>
</template>

<script>
export default {
  name: 'JDialog',
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
  .MoaflyText(500, 18px, 22px, #0f1b43);
}
.close {
  cursor: pointer;
}

/deep/.el-dialog__header {
  position: relative;
  background-color: #ffffff;
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
</style>
