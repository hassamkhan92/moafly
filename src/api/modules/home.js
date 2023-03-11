/*
 * @Author: zulezhe
 * @Date: 2022-01-14 01:30:16
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-12-25 12:56:07
 * @Path: https://gitee.com/zulezhe/
 * @Description:
 */
import request from '@/util/request';
/**
 * 房屋列表(用户和管理员共用)
 * @param {*}data
 * @returns
 */
export function getHomeList(data) {
  return request({
    url: '/moafly/houseInfo/list',
    method: 'post',
    data
  });
}
export function getRecommendData(data) {
  return request({
    url: '/moafly/houseInfo/indexPageList',
    method: 'post',
    data
  });
}
/**
 * 查询编辑未完成房屋详情
 * @param {*}
 * @returns
 */
export function getHomeDetail(hoseId) {
  return request({
    url: '/moafly/houseInfo/detail/unfinished/' + hoseId,
    method: 'get'
  });
}
/**
 * 查询编辑已完成房屋详情
 * @param {*}hoseId
 * @returns
 */
export function getCompleteHomeDetail(hoseId) {
  return request({
    url: '/moafly/houseInfo/detail/' + hoseId,
    method: 'get'
  });
}

/**
 * 房屋新增
 * @param {*}hoseId
 * @returns
 */
export function addHome(data) {
  return request({
    url: '/moafly/houseInfo/add',
    method: 'post',
    data: data
  });
}
/**
 * 新增房屋留言
 * @param {*} data
 * @returns
 */
export function addHomeMessage(data) {
  return request({
    url: '/moafly/houseInfo/addLeaveMessage',
    method: 'post',
    data: data
  })
}
/**
 * 房屋修改
 * @param {*}data
 * @returns
 */
export function updateHome(data) {
  return request({
    url: '/moafly/houseInfo/edit',
    method: 'post',
    data: data
  });
}
/**
 * 房屋图片删除
 * @param {*}data
 * @returns
 */
export function removeHomeImg(data) {
  return request({
    url: '/moafly/houseInfo/removeImg',
    method: 'post',
    data: data
  });
}
/**
 * 删除房屋
 * @param {*} houseId
 * @returns
 */
export function removeHome(houseId) {
  return request({
    url: '/moafly/houseInfo/remove/' + houseId,
    method: 'get'
  });
}
//修改房屋状态

export function updateHomeState(data) {
  return request({
    url: '/moafly/houseInfo/updateOperationType',
    method: 'post',
    data: data
  });
}

export function createHomeDescription(hoseId) {
  return request({
    url: '/moafly/houseInfo/description/' + hoseId,
    method: 'get'
  });
}
//新增房屋留言

export function addLeaveMessage(data) {
  return request({
    url: '/moafly/houseInfo/addLeaveMessage',
    method: 'post',
    data: data
  });
}
