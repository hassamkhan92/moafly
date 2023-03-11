/*
 * @Author: zulezhe
 * @Date: 2022-08-07 17:09:42
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-08-07 17:12:34
 * @Path: https://gitee.com/zulezhe/
 * @Description:
 */
import request from '@/util/request';

export function inviteRecordList(data) {
  return request({
    url: '/moafly/inviteRecord/list',
    method: 'post',
    data: data
  });
}
