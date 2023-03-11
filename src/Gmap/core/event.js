/*
 * @Author: zulezhe
 * @Date: 2022-01-12 21:39:34
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-01-12 21:39:35
 * @Path: https://gitee.com/zulezhe/
 * @Description:
 */
/**
 * 设置marker事件监听
 * @param {Object} obj 监听对象,通常为new google.maps.xx后的实体对象
 * @param {*} event     事件名称  https://developers.google.com/maps/documentation/javascript/events#maps_event_simple-javascript
 * @param {*} callback  回调函数
 */
export function addEvent(obj, event, callback) {
  obj.addListener(event, e => {
    if (typeof callback == 'function' && callback) {
      callback(e);
    }
  });
}
