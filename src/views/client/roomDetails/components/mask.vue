<!--
 * @Author: zulezhe
 * @Date: 2021-10-19 23:27:47
 * @LastEditors: wangchaoxu
 * @LastEditTime: 2021-10-21 01:18:06
 * @Path: https://gitee.com/zulezhe/
 * @Description:
-->
<template>
  <div class="mask-container">
    <div @click="handlerOpenHomeImages" class="mask-button">
      <p class="title">See all photos</p>
      <p><i class="iconfont icon-xiangyou"></i></p>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    handlerOpenHomeImages() {
      this.$emit('handlerOpenHomeImages');
    }
  }
};
</script>
<style scoped lang="less">
.mask-container {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  .mask-button {
    width: 147px;
    height: 30px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 6px;
    border: 1px solid #353f62;
    right: 12px;
    position: absolute;
    bottom: 10%;
    cursor: pointer;
    transition: all 0.5s ease-in-out;
    .flex();
    .title {
      font-family: 'Libre Franklin';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      color: #0f1b43;
    }
    p {
      margin: 0;
    }
    .iconfont {
      margin-left: 10px;
      color: #000000;
      margin-top: 10px;
    }
    &:hover {
      transform: scale(1.05);
    }
  }
}
</style>
