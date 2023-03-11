<!--
 * @Author: zulezhe
 * @Date: 2021-11-10 23:16:26
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-12-29 22:18:44
 * @Path: https://gitee.com/zulezhe/
 * @Description:
-->
<template>
  <div class="content">
    <div class="content-item" v-for="(item, index) in list" :key="item.id" @click="handleActive(item, index)">
      <img v-if="item.icon" class="content-item-icon" :src="item.icon" alt="" />
      <a v-if="isEmail(item.label)" :href="'mailto:' + item.label" class="content-item-text bold-text text-decoration">{{ item.label }}</a>
      <span class="content-item-text bold-text" v-else>{{ item.label }}</span>
    </div>
  </div>
</template>
<script>
import Is from '@/util/is';
export default {
  components: {},
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    handleActive(item, index) {
      this.$emit('handleActive', item, index);
    },
    isEmail(val) {
      return Is.email(val);
    }
  }
};
</script>
<style scoped lang="less">
.content {
  width: 100%;
  margin-top: 20px;
  .content-item {
    width: 100%;
    min-height: 23px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    cursor: pointer;
    .content-item-text {
      margin-left: 10px;
      color: #000;
    }
    .text-decoration {
      text-decoration: underline;
    }
  }
}
</style>
