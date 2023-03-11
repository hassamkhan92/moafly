<!--
 * @Author: zulezhe
 * @Date: 2021-11-16 01:47:26
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-04-04 18:56:44
 * @Path: https://gitee.com/zulezhe/
 * @Description:
-->
<template>
  <div class="my-favorites-container">
    <template>
      <Empty title="You haven't listed any property" text="Sell Your Home Now" to="/sell"></Empty>
    </template>
  </div>
</template>
<script>
import Empty from '../components/empty.vue';
export default {
  components: { Empty },
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
.my-favorites-container {
  width: 100%;
  min-height: 60%;
  display: flex;
  align-items: center;
}
</style>
