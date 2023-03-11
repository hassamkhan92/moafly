<!--
 * @Author: zulezhe
 * @Date: 2021-12-26 00:11:28
 * @LastEditors: yuechong
 * @LastEditTime: 2022-02-22 09:14:26
 * @Path: https://gitee.com/zulezhe/
 * @Description:进度条
-->
<template>
  <div class="progress-container">
    <el-progress :percentage="percentage > 100 ? 100 : percentage" :color="customColor" :show-text="false"></el-progress>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    percentage: {
      type: Number,
      default: 20
    }
  },
  data() {
    return {
      customColor: '#000'
    };
  },
  computed: {},
  created() {},
  mounted() {
  },
  methods: {}
};
</script>
<style scoped lang="less">
.progress-container {
  width: 100%;
  position: fixed;
  left: 0;
  top: 80px;
}
</style>
