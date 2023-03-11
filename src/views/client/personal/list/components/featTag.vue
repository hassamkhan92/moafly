<!--
 * @Author: zulezhe
 * @Date: 2022-02-25 00:22:21
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-04-14 00:23:21
 * @Path: https://gitee.com/zulezhe/
 * @Description:
-->
<template>
  <ul class="tag_box">
    <li v-for="(v, i) in tagList" :key="i">{{ v }}</li>
  </ul>
</template>

<script>
export default {
  props: ['tagValue'],
  data() {
    return {
      // tagList: ['zoned', 'High Efficiency', 'Whole House Fan', 'Zoned']
    };
  },
  computed: {
    tagList() {
      // return this.tagValue.split(',');
      return this.tagValue;
    }
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="less">
.tag_box {
  width: 100%;
  .flex();
  justify-content: flex-start;
  flex-wrap: wrap;
  li {
    background: #e6e7ff;
    border-radius: 4px;
    font-size: 20px;
    font-family: LibreFranklin;
    font-weight: 400;
    color: #353f62;
    padding: 2px 20px;
    margin-left: 10px;
    margin-top: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
