<!--
 * @Author: zulezhe
 * @Date: 2021-11-09 22:01:51
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-12-29 22:18:02
 * @Path: https://gitee.com/zulezhe/
 * @Description:
-->
<template>
  <div class="title-container" :style="{ width: width }">
    <span class="title medium-text">
      {{ title }}
    </span>
    <span class="line"></span>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: 'INFORMATION'
    },
    width: {
      type: String,
      default: '100%'
    }
  },
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
.title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .title {
    font-size: 14px;
    font-weight: 500;
    color: #999999;
  }
  .line {
    flex: 1;
    height: 2px;
    background: #dddddd;
    margin-left: 10px;
  }
}
</style>
