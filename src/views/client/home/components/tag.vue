<!--
 * @Author: zulezhe
 * @Date: 2021-12-06 14:32:56
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-09-17 00:12:18
 * @Path: https://gitee.com/zulezhe/
 * @Description: 标签
-->
<template>
  <div class="tag-container" :style="{ width: width, height: height, 'border-radius': radius, background: bgColor, 'box-shadow': shadow, color: color }">
    {{ text }}
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    text: {
      type: String,
      default: ' '
    },
    bgColor: {
      type: String,
      default: '#353f62'
    },
    width: {
      type: String,
      default: '120px'
    },
    height: {
      type: String,
      default: '20px'
    },
    radius: {
      type: String,
      default: '10px'
    },
    color: {
      type: String,
      default: '#fff'
    },
    shadow: {
      type: String,
      dafault: '0px 3px 16px 0px rgba(20, 32, 81, 0.32), 0px 0px 3px 0px rgba(255, 255, 255, 0.58)'
    }
  }
};
</script>
<style scoped lang="less">
.tag-container {
  padding: 0 5px;
}
</style>
