<!--
 * @Author: zulezhe
 * @Date: 2022-02-25 00:22:21
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-04-13 23:16:09
 * @Path: https://gitee.com/zulezhe/
 * @Description:
-->
<template>
  <div class="error-container">
    <img :src="require('../../assets/images/error/' + errorType + '.svg')" alt="" />
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      errorType: this.$store.getters.errorType
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style scoped lang="less">
.error-container {
  width: 100%;
  height: 100%;
  .flex();
}
</style>
