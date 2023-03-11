<template>
  <el-input :size="size" :style="{ width: Number(width) ? width + 'px' : width, '--height': heightScss }" v-bind="$attrs" v-on="$listeners"></el-input>
</template>

<script>
export default {
  name: 'MoaflyInput',
  props: {
    width: {
      type: [String, Number],
      default: 171
    },
    height: {
      type: [String, Number],
      default: 32
    },
    size: {
      type: String,
      default: 'small'
    }
  },
  computed: {
    heightScss() {
      return Number(this.height) ? this.height + 'px' : this.height;
    }
  }
};
</script>

<style lang="less" scoped>
::v-deep {
  .el-input__inner {
    height: var(--height);
  }
}
</style>
