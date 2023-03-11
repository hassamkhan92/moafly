/*
 * @Author: zulezhe
 * @Date: 2021-11-19 00:02:19
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-06-27 21:42:21
 * @Path: https://gitee.com/zulezhe/
 * @Description:
 */
import request from '@/util/request';
//静态页面测试代码
export function getBillData(data) {
  return request({
    url: './assets/data/testData.json',
    method: 'get',
    data
  });
}

/**
 * 中介雇佣
 * @param {*} data
 * @returns
 */
export function hireAgent(data) {
  return request({
    url: '/moafly/customerOrder/submit',
    method: 'post',
    data
  });
}
/**
 * 中介雇佣
 * @param {*} data
 * @returns
 */
export function getListCustomer() {
  return request({
    url: '/moafly/customerSalesRelation/listCustomer',
    method: 'get'
  });
}
/**
 * 查询中介订单列表
 * @param {*} data
 * @returns
 */
export function getBillList(data) {
  return request({
    url: '/moafly/customerOrder/saleAgent/list',
    method: 'post',
    data
  });
}
/**
 * 查询中介订单列表
 * @param {*} data
 * @returns
 */
export function getUserBillList(data) {
  return request({
    url: '/moafly/customerOrder/list',
    method: 'post',
    data
  });
}
/**
 * 中介提交订单接口
 * @param {*} data
 * @returns
 */
export function saleSubmit(data) {
  return request({
    url: '/moafly/customerOrder/saleAgent/submit',
    method: 'post',
    data
  });
}
/**
 * 用户雇佣中介提交订单
 * @param {*} data
 * @returns
 */
export function customSubmit(data) {
  return request({
    url: '/moafly/customerOrder/submit',
    method: 'post',
    data
  });
}
/**
 * 支付账单
 * @param {*} data
 * @returns
 */
export function payBill(data) {
  return request({
    url: '/moafly/stripePay/pay',
    method: 'post',
    data
  });
}
/**
 * 管理员押金订单列表
 * @param {*} data
 * @returns
 */
export function getCashPledgeList(data) {
  return request({
    url: '/moafly/customerOrder/admin/cashPledge/list',
    method: 'post',
    data
  });
}

/**
 * 管理员审批退押金！！！/moafly/relationRelieve/edit
 * @param {*} data
 * @returns
 */
export function DeleteHireRelation(data) {
  return request({
    url: '/moafly/relationRelieve/edit',
    method: 'post',
    data
  });
}
