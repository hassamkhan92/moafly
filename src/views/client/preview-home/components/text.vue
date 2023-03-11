<!--
 * @Author: zulezhe
 * @Date: 2022-06-06 21:53:46
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-06-06 21:55:01
 * @Path: https://gitee.com/zulezhe/
 * @Description:
-->
<template>
  <div class="text-container" v-if="value"></div>
  <div class="text-container" v-else></div>
</template>
<script>
export default {
  components: {},
  props: {
    value: "",
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
.text-container {
  font-size: 16px;
  font-family: LibreFranklin-SemiBold, LibreFranklin;
  font-weight: 600;
  color: #333333;
  line-height: 19px;
}
</style>
