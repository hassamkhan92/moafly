/*
 * @Author: zulezhe
 * @Date: 2022-08-08 21:30:51
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-08-08 21:35:17
 * @Path: https://gitee.com/zulezhe/
 * @Description:
 */
import request from '@/util/request';

export function addCustomerOffer(data) {
  return request({
    url: '/moafly/customerOffer/add',
    method: 'post',
    data
  });
}

export function getOfferList(data) {
  return request({
    url: '/moafly/customerOffer/list',
    method: 'post',
    data
  });
}

export function postCustomerOffer(data) {
  return request({
    url: '/moafly/houseOffer/add',
    method: 'post',
    data
  });
}

export function getOfferDetail(offerId) {
  return request({
    url: `/moafly/customerOffer/detail/${offerId}`,
    method: 'get'
  });
}
