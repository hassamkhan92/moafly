<!--
 * @Author: zulezhe
 * @Date: 2022-06-06 20:51:52
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-11-28 23:45:51
 * @Path: https://gitee.com/zulezhe/
 * @Description:
-->
<template>
  <div class="detail_info-Introduction">
    {{ homeDetailsData.publicRemarks || "Current listing doesn't provide any public remarks." }}
  </div>
</template>

<script>
export default {
  props: {
    homeDetailsData: {
      type: Object,
      default: () => {}
    }
  }
};
</script>

<style lang="less" scoped>
.detail_info-Introduction {
  width: 100%;
  font-size: 16px;
  font-weight: 400;
  color: #333333;
  line-height: 26px;
  padding-top: 15px;
}
</style>
