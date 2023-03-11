<!--
 * @Author: zulezhe
 * @Date: 2021-11-18 23:41:15
 * @LastEditors: wangchaoxu
 * @LastEditTime: 2021-11-21 01:39:21
 * @Path: https://gitee.com/zulezhe/
 * @Description:
-->
<template>
  <div class="person-content-header-container">
    <el-row type="flex" justify="" class=" list-header" :gutter="40">
      <el-col :span="7">
        <span class="title">Agent</span>
        <span class="line"></span>
      </el-col>
      <el-col :span="5">
        <span class="title">Title</span>
        <span class="line"></span>
      </el-col>
      <el-col :span="3">
        <span class="title">Bill Price</span>
        <span class="line"></span>
      </el-col>
      <el-col :span="3">
        <span class="title">Bill Status</span>
        <span class="line"></span>
      </el-col>
      <el-col :span="6">
        <span class="title">Details</span>
        <span class="line"></span>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style scoped lang="less">
.person-content-header-container {
  width: 100%;
  .list-header {
    width: 100%;
    .el-col {
      display: flex;
      align-items: center;
      .line {
        flex: 1;
        height: 2px;
        background: #dddddd;
        // margin-left: 10px;
      }
    }
  }
}
</style>
