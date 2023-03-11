/*
 * @Author: zulezhe
 * @Date: 2022-01-12 21:36:11
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-01-14 01:26:05
 * @Path: https://gitee.com/zulezhe/
 * @Description:
 */
/**
 * 添加marker
 * @param {*} map
 * @param {Object} position 经纬度 { lat: 40.731, lng: -73.997 }
 */
export function addMarker(map, position = { lat: 34.04, lng: -118.15 }, icon = { url: 'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2.png' }) {
  const marker = new google.maps.Marker({
    map,
    icon,
    position
  });
  return marker;
}
export function addMarkerByPlace(map, place) {
  const marker = new google.maps.Marker({
    map,
    anchorPoint: new google.maps.Point(0, -29)
  });
  marker.setPosition(place.geometry.location);
  return marker;
}
export function goToMarker(map, position) {
  map.setCenter(position);
}
/**
 * 删除marker
 * @param {*} marker
 */
export function deleteMarker(marker) {
  marker.setMap(null);
}
