<!--
 * @Author: zulezhe
 * @Date: 2022-06-13 19:35:33
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-06-27 21:41:47
 * @Path: https://gitee.com/zulezhe/
 * @Description:
-->
<template>
  <!-- Congratulations on your first request post! -->
  <div class="post_title">
    <div class="title">Congratulations on your task post!</div>
    <img src="../../../../assets/images/rocket.svg" alt="" class="state" />
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.post_title {
  display: flex;
  justify-content: center;
  flex-direction: column;
  .title {
    text-align: center;
    font-size: 36px;
    font-family: LibreFranklin-SemiBold, LibreFranklin;
    font-weight: 600;
    color: #333333;
    line-height: 44px;
    margin-top: 120px;
  }
  .state {
    height: 500px;
    height: 500px;
    margin: 0 auto;
  }
}
</style>
