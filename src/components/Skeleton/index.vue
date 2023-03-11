<!--
 * @Author: zulezhe
 * @Date: 2022-06-27 23:22:54
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-06-28 00:00:12
 * @Path: https://gitee.com/zulezhe/
 * @Description:
-->
<template>
  <el-skeleton style="width: 100%;height:100%" :loading="loading" :animated="animated" :throttle="throttle" :count="count">
    <template slot="template">
      <div style="display: flex;" class="item">
        <el-skeleton-item variant="image" style="width: 276px;height: 182px;border-radius: 10px;" />
        <div style="width: calc(100% - 300px);height:100%; display: flex;flex-direction: column;  margin-left:20px">
          <el-skeleton-item variant="p" style="width:60%" />
          <el-skeleton-item variant="p" style="width:50%;margin-top:20px" />
          <el-skeleton-item variant="p" style="width: 40%;margin-top:20px" />
          <el-skeleton-item variant="p" style="width: 50%;margin-top:20px" />
          <el-skeleton-item variant="p" style="width: 60%;margin-top:20px" />
          <el-skeleton-item variant="p" style="width: 100%;margin-top:20px" />
        </div>
      </div>
    </template>
    <template>
      <slot></slot>
    </template>
  </el-skeleton>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      default: 10
    },
    loading: {
      type: Boolean,
      default: true
    },
    animated: {
      type: Boolean,
      default: true
    },
    throttle: {
      type: Number,
      default: 500
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.el-skeleton {
  .item {
    width: 100%;
    height: 267px;
    border-bottom: 1px solid #afafaf;
    padding: 32px 24px;
    .flex();
    justify-content: space-between;
    align-items: flex-start;
  }
}
</style>
