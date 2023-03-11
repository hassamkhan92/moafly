/*
 * @Author: zulezhe
 * @Date: 2022-01-12 21:34:52
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-05-07 22:58:44
 * @Path: https://gitee.com/zulezhe/
 * @Description:
 */
/**
 * html获取定位
 */
export function getLocation() {
  return new Promise((resove, reject) => {
    navigator.geolocation.getCurrentPosition(position => {
      resove({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
    });
  });
}
