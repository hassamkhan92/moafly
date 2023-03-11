/*
 * @Author: zulezhe
 * @Date: 2022-01-04 00:34:02
 * @LastEditors: wangchaoxu
 * @LastEditTime: 2022-01-04 00:35:20
 * @Path: https://gitee.com/zulezhe/
 * @Description:角色接口管理
 */
import request from '@/util/request';

/**
 * 查询菜单
 * @param {*} data
 * @returns
 */
export function listMenu() {
  return request({
    url: '/moafly/menuInfo/list',
    method: 'get'
    // data
  });
}

/**
 * 新增菜单
 * @param {*} data
 * @returns
 */
export function addMenu(data) {
  return request({
    url: '/moafly/menuInfo/add',
    method: 'post',
    data
  });
}

/**
 * 编辑菜单
 * @param {*} data
 * @returns
 */
export function editMenu(data) {
  return request({
    url: '/moafly/menuInfo/edit',
    method: 'post',
    data
  });
}

/**
 * 删除菜单
 * @param {*} menuId
 * @returns
 */
export function delMenu(menuId) {
  return request({
    url: '/moafly/menuInfo/remove/' + menuId,
    method: 'get'
  });
}
