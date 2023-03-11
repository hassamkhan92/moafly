<!--
 * @Author: zulezhe
 * @Date: 2022-12-05 20:31:46
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-12-05 21:57:00
 * @Path: https://gitee.com/zulezhe/
 * @Description:
-->
<template>
  <el-input :class="{ 'input-prefix': prefix }" :style="{ width: Number(width) ? width + 'px' : width, '--height': heightScss }" v-bind="$attrs" v-on="$listeners" clearable>
    <template v-if="suffix" slot="suffix">
      <slot name="suffix"></slot>
    </template>
    <template v-if="prefix" slot="prefix">
      <slot name="prefix"></slot>
    </template>
    <template v-if="append" slot="append">
      <slot name="append"></slot>
    </template>
  </el-input>
</template>

<script>
export default {
  name: 'JInput',
  props: {
    width: {
      type: [String, Number],
      default: 390
    },
    height: {
      type: [String, Number],
      default: 56
    },
    suffix: {
      type: Boolean,
      default: false
    },
    prefix: {
      type: Boolean,
      default: false
    },
    append: {
      type: Boolean,
      default: false
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
  .el-textarea__inner {
    height: var(--height);
    padding-top: 23px;
    border: 1px solid rgba(15, 27, 67, 0.4);
    &::placeholder {
      .MoaflyText(500, 14px, 19px, rgba(15, 27, 67, 0.2));
    }
    &:focus {
      outline: none;
      border-color: #dc5674 !important;
    }
  }
  .el-input__inner {
    height: var(--height);
    border: 1px solid rgba(15, 27, 67, 0.4);
    // padding: 0 25px;
    .MoaflyText(500, 17px, var(--height), #0f1b43);
    &::placeholder {
      .MoaflyText(400, 18px, var(--height), #999999);
    }
  }

  .el-input.is-focus .el-input__inner {
    border-color: #dc5674;
  }
  .el-input__prefix {
    .MoaflyText(400, 17px, var(--height), #333333);
    transform: translateX(16px);
    left: -5px !important;
    &.el-input__inner {
      padding-left: 40px !important;
    }
  }
}
</style>
