<!--
 * @Author: zulezhe
 * @Date: 2020-11-14 22:21:28
 * @LastEditors: wangchaoxu
 * @LastEditTime: 2021-11-18 23:45:08
 * @Path: https://gitee.com/zulezhe/
 * @Description:
-->
<template>
  <div class="person-container">
    <!-- 个人中心内容 -->
    <div class="person-content">
      <Side></Side>
      <div class="person-router-view">
        <router-view> </router-view>
      </div>
    </div>
  </div>
</template>
<script>
import Side from './components/side.vue';
export default {
  components: { Side },
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
@import url('./index.less');
</style>
