/*
 * @Author: zulezhe
 * @Date: 2022-01-12 21:34:33
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-10-16 21:23:37
 * @Path: https://gitee.com/zulezhe/
 * @Description:
 */
/**
 * 地图初始化
 * @param {object} option
 * {
 *   enter: option.location ? option.location : { lat: 40.731, lng: -73.997 },
 *   zoom: 16,
 *   zoomControl: false,
 *   mapTypeControl: false,
 *   scaleControl: false,
 *   streetViewControl: false,
 *   rotateControl: false,
 *   fullscreenControl: false
 * }
 */
export function initMap(option) {
  let config = {
    el: 'gmap',
    center: option.position ? option.position : { lat: 34.04, lng: -118.15 },
    zoom: 10,
    zoomControl: true,
    mapTypeControl: true,
    scaleControl: false,
    streetViewControl: true,
    rotateControl: false,
    fullscreenControl: true
  };
  config = Object.assign(config, option);
  // console.log('config===>', config);
  return new google.maps.Map(document.getElementById(config.el), config);
}
/**
 * 设置地图中心点位置
 * @param {*} map
 * @param {*} address
 */
export function setCenter(map, address) {
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({ address: address }, (results, status) => {
    console.log(results, status);
    if (status === 'OK') {
      map.setCenter(results[0].geometry.location);
    } else {
      window.alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}
