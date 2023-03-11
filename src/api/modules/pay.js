import request from '@/util/request';
import axios from 'axios';
//新增支付方式
export function addPayMethod(data) {
  return request({
    url: '/moafly/payMethod/add',
    method: 'post',
    data
  });
}
//删除支付方式
export function delPayMethod(payMethodId) {
  return request({
    url: `/moafly/payMethod/del/${payMethodId}`,
    method: 'get'
  });
}
//支付方式列表
export function payMethodList() {
  return request({
    url: `/moafly/payMethod/list`,
    method: 'get'
  });
}
//用户确认付款接口
export function confirmSubmit(data) {
  return request({
    url: '/moafly/customerOrder/confirmSubmit',
    method: 'post',
    data
  });
}
