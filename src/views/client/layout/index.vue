<!--
 * @Author: zulezhe
 * @Date: 2021-12-18 15:55:45
 * @LastEditors: zulezhe
 * @LastEditTime: 2023-01-17 21:17:54
 * @Path: https://gitee.com/zulezhe/
 * @Description:客户端布局
-->
<template>
  <div class="client-layout-container" id="home-container">
    <Header :class="name"></Header>
    <router-view></router-view>
  </div>
</template>
<script>
import Header from '@/components/header/index.vue';
export default {
  components: { Header },
  data() {
    return {
      name: this.$route.name
    };
  },
  computed: {},
  created() {},
  mounted() {
    window.addEventListener('scroll', this.handleScroll, true);
  },
  methods: {
    handleScroll() {
      let scrollTop = document.getElementById('home-container').scrollTop;
      if (scrollTop > 80) {
        this.name = '';
      } else {
        this.name = this.$route.name;
      }
    }
  }
};
</script>
<style scoped lang="less">
.client-layout-container {
  width: 100%;
}
</style>
