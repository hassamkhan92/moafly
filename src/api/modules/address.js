/*
 * @Author: zulezhe
 * @Date: 2022-01-13 23:53:24
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-01-13 23:53:24
 * @Path: https://gitee.com/zulezhe/
 * @Description:
 */
import request from '@/util/request';

// 查询【请填写功能名称】列表
export function getSateData(data) {
  return request({
    url: '/system/info/list',
    method: 'get',
    data
  });
}
