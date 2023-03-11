<!--
 * @Author: zulezhe
 * @Date: 2022-01-12 00:54:50
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-05-26 20:39:00
 * @Path: https://gitee.com/zulezhe/
 * @Description:谷歌地图组件
-->
<template>
  <div class="gmap-map-container" :id="el"></div>
</template>
<script>
import { initMap } from '@/Gmap/core';
export default {
  components: {},
  props: {
    el: {
      type: String,
      default: 'gmap'
    },
    position: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {
    console.log('position==>', this.position);
    let map = initMap({ el: this.el });
    setTimeout(() => {
       this.$emit('complete', map);
    }, 500);
  },
  methods: {}
};
</script>
<style scoped lang="less">
.gmap-map-container {
  width: 100%;
  height: 100%;
}
</style>
