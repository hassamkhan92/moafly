/*
 * @Author: zulezhe
 * @Date: 2021-12-19 23:57:06
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-02-26 15:46:26
 * @Path: https://gitee.com/zulezhe/
 * @Description:
 */
import request from '@/util/request';
export const uploadUrl = '/moafly/file/upload';

export function uploadFile(data) {
  return request({
    headers: { 'Content-Type': 'multipart/form-data' },
    url: '/moafly/file/upload',
    method: 'post',
    data
  });
}
