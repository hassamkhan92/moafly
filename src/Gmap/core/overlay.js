/*
 * @Author: zulezhe
 * @Date: 2022-01-12 21:43:35
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-01-12 21:49:59
 * @Path: https://gitee.com/zulezhe/
 * @Description:
 */
/**
 * 添加geojson数据
 * @param {*} map 地图对象
 * @param {*} geoJson geojson数据
 * @param {*} options 配置项
 * @param {*} callback 回调函数
 */
export function addGeojson(map, geoJson, options, callback) {
  let feature = map.data.addGeoJson(geoJson, options);
  const bounds = new google.maps.LatLngBounds();
  map.data.forEach(feature => {
    processPoints(feature.getGeometry(), bounds.extend, bounds);
  });
  map.fitBounds(bounds);
  return feature;
}
/**
 * 删除geojson
 * @param {*} map
 */
export function removeGeojson(map) {
  map.data.forEach(feature => {
    map.data.remove(feature);
  });
}
/**
 * 视角内部的点
 * @param {*} geometry
 * @param {*} callback
 * @param {*} thisArg
 */
function processPoints(geometry, callback, thisArg) {
  if (geometry instanceof google.maps.LatLng) {
    callback.call(thisArg, geometry);
  } else if (geometry instanceof google.maps.Data.Point) {
    callback.call(thisArg, geometry.get());
  } else {
    geometry.getArray().forEach(g => {
      processPoints(g, callback, thisArg);
    });
  }
}
