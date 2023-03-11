<!--
 * @Author: zulezhe
 * @Date: 2022-03-10 20:55:30
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-03-14 22:50:09
 * @Path: https://gitee.com/zulezhe/
 * @Description:
-->
<template>
  <svg width="908px" height="169px" viewBox="0 0 908 169" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <title>编组 5</title>
    <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <g id="引导页" transform="translate(-154.000000, -271.000000)" stroke="#353F62" stroke-width="4">
        <g id="编组-5" transform="translate(156.673296, 273.000000)">
          <path
            class="test"
            d="M5.68434189e-14,0 C98.3782462,158.555861 243.487148,202.225322 435.326704,131.008384 C723.08604,24.182978 768.815854,40 885.326704,120"
            id="路径"
            stroke-linecap="round"
          ></path>
          <circle id="椭圆形" fill="#FFFFFF" cx="893.326704" cy="126" r="10" class="circle"></circle>
        </g>
      </g>
    </g>
  </svg>
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
  methods: {}
};
</script>
<style scoped lang="less">
.test {
  stroke-dasharray: 0 1500;
  animation: rot 1s linear alternate forwards;
}

.circle {
  stroke-dasharray: 0 570;
  animation: rot2 5s linear infinite;
  animation-delay: 0.6s;
}

@keyframes rot {
  100% {
    stroke-dasharray: 1500;
  }
}

@keyframes rot2 {
  100% {
    stroke-dasharray: 570 570;
  }
}
</style>
