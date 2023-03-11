/*
 * @Author: zulezhe
 * @Date: 2022-01-12 21:38:03
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-01-19 20:44:29
 * @Path: https://gitee.com/zulezhe/
 * @Description:
 */
/**
 * 地理编码,位置信息转为经纬度
 * @param {String1} address 地址
 * @return {Promise} 经纬度
 */
export function geocodeAddress(address) {
  return new Promise((resove, reject) => {
    new google.maps.Geocoder().geocode({ address: address }, (results, status) => {
      if (status === 'OK') {
        resove(results[0].geometry.location.toJSON());
      } else {
        reject({});
      }
    });
  });
}
