/*
 * @Author: zulezhe
 * @Date: 2022-01-14 01:30:16
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-05-09 18:27:36
 * @Path: https://gitee.com/zulezhe/
 * @Description:
 */
import request from '@/util/request';
/**
 * 搜索房屋
 * @param {*}data
 * @returns
 */
export function getHomeList(data) {
  return request({
    url: '/moafly/thirdHouse/list',
    method: 'post',
    data
  });
}
/**
 * 获取第三方房屋详情
 * @param {*}data
 * @returns
 */
export function getHomeDetails(listingKey) {
  return request({
    url: `/moafly/thirdHouse/detail/${listingKey}`,
    method: 'get'
  });
}

/**
 * 房屋估价
 * @param {*}data
 * @returns
 */
export function moestimate(data) {
  return request({
    url: '/moafly/thirdHouse/moestimate',
    method: 'post',
    data
  });
}
