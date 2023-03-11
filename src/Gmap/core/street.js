/*
 * @Author: zulezhe
 * @Date: 2022-01-12 21:41:10
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-03-13 20:30:52
 * @Path: https://gitee.com/zulezhe/
 * @Description:添加实景街道
 */
/**
 * 查看实景
 * @param {*} id
 * @param {*} position
 */
export function addStreetView(id, position = { lat: 40.731, lng: -73.997 }) {
  return new google.maps.StreetViewPanorama(document.getElementById(id), {
    position: position,
    pov: {
      heading: 34,
      pitch: 10
    }
  });
}
