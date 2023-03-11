<!--
 * @Author: zulezhe
 * @Date: 2022-03-13 19:55:13
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-03-13 19:59:00
 * @Path: https://gitee.com/zulezhe/
 * @Description:
-->
<template>
  <div class="gmap-street-container" id="map-street"></div>
</template>
<script>
import { addStreetView } from '@/Gmap/core';
export default {
  components: {},
  props: {
    position: {
      lat: 40.731,
      lng: -73.997
    }
  },
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {
    addStreetView('map-street', this.position);
  },
  methods: {}
};
</script>
<style scoped lang="less">
.gmap-street-container {
  width: 100%;
  height: 100%;
}
</style>
