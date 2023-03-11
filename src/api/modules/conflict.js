/*
 * @Author: zulezhe
 * @Date: 2021-12-18 16:47:34
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-02-26 15:46:38
 * @Path: https://gitee.com/zulezhe/
 * @Description:
 */
import request from '@/util/request';

/**
 * 查询冲突列表
 * @param {*} data
 * @returns
 */
export function listConflict(data) {
  return request({
    url: '/moafly/workOrder/list',
    method: 'post',
    data
  });
}

/**
 * 新增冲突
 * @param {*} data
 * @returns
 */
export function addConflict(data) {
  return request({
    url: '/moafly/workOrder/add',
    method: 'post',
    data
  });
}
/**
 * 新增冲突解决方案
 * @param {*} data
 * @returns
 */
export function addConflictSolutions(data) {
  return request({
    url: '/moafly/workOrder/addSolution',
    method: 'post',
    data
  });
}
