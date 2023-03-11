/*
 * @Author: zulezhe
 * @Date: 2022-11-06 20:46:26
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-11-07 18:38:39
 * @Path: https://gitee.com/zulezhe/
 * @Description:
 */
import request from '@/util/request';

export function getHistoryList(data) {
  return request({
    url: '/moafly/customerSalesRelation/history',
    method: 'post',
    data
  });
}
export function addComment(data) {
  if (data.evaluateScore <= 0) return Promise.reject();
  return request({
    url: '/moafly/salesAgentEvaluate/add',
    method: 'post',
    data
  });
}
