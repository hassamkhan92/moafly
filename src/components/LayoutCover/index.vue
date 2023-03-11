<!--
 * @Author: zulezhe
 * @Date: 2021-11-07 22:03:43
 * @LastEditors: wangchaoxu
 * @LastEditTime: 2021-11-15 00:50:06
 * @Path: https://gitee.com/zulezhe/
 * @Description:
-->
<template>
  <div class="layout-conver-button">
    <div class="conver-image conver-item" :class="activeType == 'image' ? 'active' : ''" @click="handleCover('image')">
      <i class="iconfont icon-caidan"></i>
      <span>Image</span>
    </div>
    <div class="conver-slider conver-item" :class="activeType"></div>
    <div class="conver-list conver-item" :class="activeType == 'list' ? 'active' : ''" @click="handleCover('list')">
      <i class="iconfont icon-liebiao"></i>
      <span>List</span>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      activeType: 'list'
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    handleCover(type) {
      this.activeType = type;
      this.$emit('handleCover', type);
    }
  }
};
</script>
<style scoped lang="less">
.layout-conver-button {
  width: 165px;
  height: 42px;
  background: #f8f8f8;
  border-radius: 21px;
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .conver-item {
    width: 80px;
    font-size: 14px;
    font-weight: 400;
    color: #333333;
    line-height: 27px;
    z-index: 1;
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .conver-slider {
    position: absolute;
    left: 50%;
    z-index: 0;
    width: 80px;
    height: 35px;
    background: #ffffff;
    box-shadow: 0px 0px 4px 0px rgba(16, 28, 70, 0.3);
    border-radius: 18px;
    transition: all 0.3s ease-in;
  }
  .conver-slider.image {
    left: 0;
  }
  .conver-slider.list {
    left: 50%;
  }
  .conver-item.active {
    .iconfont,
    span {
      color: #000;
    }
  }
}
</style>
