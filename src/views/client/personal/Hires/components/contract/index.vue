<!--
 * @Author: zulezhe
 * @Date: 2022-12-21 21:54:31
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-12-25 19:51:32
 * @Path: https://gitee.com/zulezhe/
 * @Description:
-->
<template>
  <div class="contract-item">
    <span class="title">{{ contractInfo.inviteTitle }}</span>
    <span class="pay-type">{{ contractInfo.payType === 0 ? 'Hourly-paid' : 'Fixed-price' }}</span>
    <span v-if="contractInfo.relationState === 2" class="status">Ended</span>
    <span v-else class="status active">Active</span>
  </div>
</template>

<script>
export default {
  props: ['contractInfo']
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>
