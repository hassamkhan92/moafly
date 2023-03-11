<!--
 * @Author: zulezhe
 * @Date: 2022-06-06 20:51:52
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-06-09 00:48:01
 * @Path: https://gitee.com/zulezhe/
 * @Description:
-->
<template>
  <div class="detail_info-Map">
    <div class="title_box">
      <p class="title1">Map</p>
    </div>
    <div class="map_box">
      <Map el="map" @complete="mapComplete"></Map>
    </div>
  </div>
</template>

<script>
import Map from '@/Gmap/ui/Map';
export default {
  components: { Map },
  methods: {
    mapComplete(map) {
      console.log('地图加载完成==>', map);
      this.map = map;
      this.$emit('complete', map);
      // let el = document.getElementById('auto-search-address');
      //   autoSearch(el, map, (res, place) => {
      //     this.searchParams.unparsedAddress = res.address;
      //     this.searchParams.city = res.locality;
      //     this.searchParams.stateOrProvince = res.state;
      //     this.searchParams.postalCode = res.postcode.split('-')[0];
      //     console.log('获取地址', res, place, res.bounds.toJSON());
      //     // let marker = addMarkerByPlace(map, place);
      //     // this.position = marker.getPosition();
      //     // console.log('获取地址', res);
      //     // console.log('获取经纬度==>', this.position.toJSON());
      //     // goToMarker(map, this.position);
      //     this.rectangle = new google.maps.Rectangle({
      //       strokeColor: '#353f62',
      //       strokeOpacity: 0.8,
      //       strokeWeight: 2,
      //       fillColor: '#FF0000',
      //       fillOpacity: 0.05,
      //       map,
      //       bounds: res.bounds.toJSON()
      //     });
      //     this.rectangle.setMap(map);
      //     this.handleSearch();
      //   });
    }
  }
};
</script>

<style lang="less" scoped>
.detail_info-Map {
  padding-top: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid #afafaf;
  .title_box {
    margin-bottom: 15px;
    .flex();
    justify-content: space-between;
    .title1 {
      font-family: 'Libre Franklin';
      font-style: normal;
      font-weight: 700;
      font-size: 18px;
      line-height: 22px;
      color: #0f1b43;
    }
    .title2 {
      position: relative;
      font-family: 'Libre Franklin';
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      text-decoration-line: underline;
      color: #dc5674;
      &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1px;
        background: #dc5674;
      }
    }
  }
  .map_box {
    width: 100%;
    height: 300px;
  }
}
</style>
