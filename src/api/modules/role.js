/*
 * @Author: zulezhe
 * @Date: 2022-01-04 00:32:16
 * @LastEditors: wangchaoxu
 * @LastEditTime: 2022-01-04 00:33:10
 * @Path: https://gitee.com/zulezhe/
 * @Description:
 */
/*
 * @Author: zulezhe
 * @Date: 2021-12-18 16:47:34
 * @LastEditors: wangchaoxu
 * @LastEditTime: 2021-12-20 20:47:11
 * @Path: https://gitee.com/zulezhe/
 * @Description:
 */
import request from '@/util/request';

/**
 * 查询角色列表
 * @param {*} data
 * @returns
 */
export function listRole(data) {
  return request({
    url: '/moafly/customerRole/list',
    method: 'post',
    data
  });
}

/**
 * 新增角色
 * @param {*} data
 * @returns
 */
export function addRole(data) {
  return request({
    url: '/moafly/customerRole/editRoleMenu',
    method: 'post',
    data
  });
}
/**
 * 查看角色菜单
 */
export function getUserMenu(roleId) {
  return request({
    url: '/moafly/customerRole/roleMenusDetail/' + roleId,
    method: 'get'
  });
}
