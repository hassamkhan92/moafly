<!--
 * @Author: zulezhe
 * @Date: 2022-11-21 20:19:48
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-11-28 22:25:30
 * @Path: https://gitee.com/zulezhe/
 * @Description:
-->
<template>
  <el-input id="auto-search-address" input-class="auto-search-address" :style="{ width: Number(width) ? width + 'px' : width, '--height': heightScss }" v-bind="$attrs" v-on="$listeners" clearable>
    <template slot="suffix">
      <slot name="suffix"></slot>
    </template>
    <template slot="prefix">
      <slot name="prefix"></slot>
    </template>
    <template slot="append">
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
p {
  margin: 0;
}
::v-deep {
  .el-textarea__inner {
    height: var(--height);
    padding-top: 23px;
    background: #ffffff;
    border: 1px solid rgba(15, 27, 67, 0.4);
    &::placeholder {
      .MoaflyText(500, 14px, 19px, rgba(15, 27, 67, 0.2));
    }
    &:focus {
      outline: none;
    }
  }
  .el-input__inner {
    height: var(--height);
    background: #ffffff;
    border: 1px solid rgba(15, 27, 67, 0.4);
    padding: 0 40px;
    .MoaflyText(500, 17px, var(--height), #0f1b43);
    &::placeholder {
      .MoaflyText(400, 18px, var(--height), #999999);
    }
  }

  .el-input__prefix {
    .MoaflyText(400, 17px, var(--height), #333333);
    transform: translateX(16px);
  }
}
</style>
