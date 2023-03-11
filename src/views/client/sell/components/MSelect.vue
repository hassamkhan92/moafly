<!--
 * @Author: zulezhe
 * @Date: 2022-11-26 10:42:36
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-12-01 21:44:19
 * @Path: https://gitee.com/zulezhe/
 * @Description:
-->
<template>
  <el-select :style="{ width: Number(width) ? width + 'px' : width, '--height': heightScss }" v-bind="$attrs" v-on="$listeners" v-model="$attrs.value" :placeholder="$attrs.placeholder" clearable>
    <slot v-if="isSlot"></slot>
    <template v-else>
      <el-option v-for="item in $attrs.options" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
    </template>
  </el-select>
</template>

<script>
export default {
  inheritAttrs: false,
  name: 'JSelect',
  props: {
    width: {
      type: [String, Number],
      default: 314
    },
    height: {
      type: [String, Number],
      default: 56
    },
    isSlot: {
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
<style lang="less">
/*右侧图标样式*/
.el-select .el-input .el-select__caret.el-input__icon::before {
  content: '';
  background: url('~@/assets/svg/select-suffix.svg') center center no-repeat;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.el-select .el-input .el-select__caret {
  transform: rotateZ(0deg);
}
</style>

<style lang="less" scoped>
::v-deep {
  .el-input__inner {
    height: var(--height);
    border: 1px solid rgba(15, 27, 67, 0.4);
    .MoaflyText(500, 17px, var(--height), #0f1b43);
    color: #0f1b43 !important;
    // padding: 0 40px;
    &::placeholder {
      .MoaflyText(400, 14px, var(--height), #999999);
    }
  }
  .el-input__suffix {
    right: 10px;
  }
  .el-input__icon {
    &::before {
      color: #999999;
    }
  }
}
</style>
