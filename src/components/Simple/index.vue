<!--
 * @Author: zulezhe
 * @Date: 2021-10-18 20:43:35
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-07-07 21:33:28
 * @Path: https://gitee.com/zulezhe/
 * @Description:
-->
<template>
  <div class="simple-container simple-home-view">
    <div class="img-container">
      <el-image style="width: 387px; height: 314px" :src="src" fit="fit"></el-image>
    </div>
    <div class="desc-container"></div>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    src: {
      type: String,
      default: require('@/assets/images/index/home1.png')
    }
  },
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
.simple-container {
  width: 387px;
  height: 458px;
}
</style>
