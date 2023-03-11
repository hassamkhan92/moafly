<template>
  <el-select
    :size="size"
    :style="{ width: Number(width) ? width + 'px' : width, '--height': heightScss }"
    v-bind="$attrs"
    v-on="$listeners"
    v-model="$attrs.value"
    :placeholder="$attrs.placeholder"
    clearable
  >
    <slot></slot>
  </el-select>
</template>

<script>
export default {
  inheritAttrs: false,
  name: 'MoaflySelect',
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
