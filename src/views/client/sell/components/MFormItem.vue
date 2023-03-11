<template>
  <el-form-item v-bind="$attrs" v-on="$listeners"> <slot></slot> </el-form-item>
</template>

<script>
export default {
  name: 'JFormItem',
  props: {
    height: {
      type: [String, Number],
      default: 32
    },
    mBottom: {
      type: [String, Number],
      default: 16
    }
  },
  computed: {
    heightScss() {
      return Number(this.height) ? this.height + 'px' : this.height;
    },
    mBottomScss() {
      return Number(this.mBottom) ? this.mBottom + 'px' : this.mBottom;
    }
  }
};
</script>

<style lang="less" scoped>
::v-deep {
  .el-form-item {
    margin-bottom: 16px;
  }
  .el-form-item__label {
    position: relative;
    .MoaflyText(400, 14px, var(--Mheight), rgba(15, 27, 67, 0.6));
    padding-bottom: 12px;
    padding-right: 0;
    &::before {
      position: absolute;
      top: 0;
      right: -12px;
    }
  }
  .el-input__icon {
    line-height: var(--Mheight);
  }
}
</style>
