<!--
 * @Author: zulezhe
 * @Date: 2022-11-26 10:42:36
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-12-02 22:18:34
 * @Path: https://gitee.com/zulezhe/
 * @Description:
-->
<template>
  <el-date-picker :style="{ width: Number(width) ? width + 'px' : width, '--height': heightScss }" v-bind="$attrs" v-on="$listeners" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
    <i class="el-icon-date data_icon"></i>
  </el-date-picker>
</template>

<script>
export default {
  name: 'JDate',
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
::v-deep {
  .el-input__inner {
    height: var(--height);
    border: 1px solid rgba(15, 27, 67, 0.4);
    .MoaflyText(500, 14px, var(--height), #0f1b43);
    padding-left: 15px;
    &::placeholder {
      .MoaflyText(400, 18px, var(--height), #0f1b43);
    }
  }
  .el-input.is-focus .el-input__inner {
    border-color: #dc5674;
  }

  .el-input__prefix {
    right: 10px;
    left: unset;
    color: rgba(15, 27, 67, 0.6);
    margin-right: 15px;
  }
  .el-input__suffix {
    right: 25px;
    color: rgba(15, 27, 67, 0.6);
  }
}
</style>
