/*
 * @Author: zulezhe
 * @Date: 2021-12-18 16:47:34
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-08-08 21:35:35
 * @Path: https://gitee.com/zulezhe/
 * @Description:
 */
import request from '@/util/request';

/**
 * 查询中介列表
 * @param {*} data
 * @returns
 */
export function listAgent(data) {
  return request({
    url: '/moafly/salesAgent/list',
    method: 'post',
    data
  });
}

/**
 * 新增中介
 * @param {*} data
 * @returns
 */
export function addAgent(data) {
  return request({
    url: '/moafly/salesAgent/add',
    method: 'post',
    data
  });
}

/**
 * 编辑中介
 * @param {*} data
 * @returns
 */
export function editAgent(data) {
  return request({
    url: '/moafly/salesAgent/edit',
    method: 'post',
    data
  });
}

/**
 * 删除中介
 * @param {*} data
 * @returns
 */
export function delAgent(data) {
  return request({
    url: '/moafly/salesAgent/remove/' + data,
    method: 'get'
  });
}

/**
 * 查看中介详情
 * @param {*} AgentId
 * @returns
 */
export function detailAgent(AgentId) {
  return request({
    url: '/moafly/salesAgent/detail/' + AgentId,
    method: 'get'
  });
}

/**
 * 查询用户雇佣的中介列表
 */
export function getHiredAgentsList(data) {
  return request({
    url: '/moafly/customerSalesRelation/list',
    method: 'post',
    data
  });
}
/**
 * 解除雇佣关系申请
 * @param {*} relationId
 * @returns
 */
export function relationRelieve(relationId) {
  return request({
    url: '/moafly/relationRelieve/' + relationId,
    method: 'get'
  });
}

/**
 * 查询用户与中介当前雇佣状态
 * @param {*} AgentId
 * @returns
 */
export function getAgentHireStatus(AgentId) {
  return request({
    url: '/moafly/customerSalesRelation/detail/' + AgentId,
    method: 'get'
  });
}

/**
 * 提交中介雇佣订单
 */
export function hireAgent(data) {
  //   data.orderMoney = Number(data.orderMoney);
  //   if (data.payType === 1) data.orderMoney = 500;
  //   if (data.taskId === '') delete data.taskId;
  return request({
    url: '/moafly/customerOrder/submit',
    method: 'post',
    data
  });
}
//查询房屋价格
export function queryHomeMuch(params) {
  return request({
    url: 'http://101.33.235.27:5000/mo',
    method: 'get',
    params
  });
}
