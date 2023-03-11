/*
 * @Author: wangchaoxu
 * @Date: 2020-12-16 10:35:59
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-03-27 14:14:26
 * @Description: In User Settings Edit
 * @FilePath: \Moafly\src\api\user.js
 */
import request from '@/util/request';
const header = { 'Content-Type': 'multipart/form-data' };
// 登陆
export function login(data) {
  return request({
    url: '/moafly/customer/login',
    method: 'post',
    data
  });
}
// 注册
export function signup(data) {
  return request({
    url: '/moafly/customer/register',
    method: 'post',
    data
  });
}
/**
 * 修改密码
 * @example
 * {
 *  "customerConfirmPassword": "string",
 *  "customerPassword": "string",
 *  "verificationCode": "string"
 * }
 * @returns
 */
export function editPassd(data) {
  return request({
    url: '/moafly/customer/edit/password',
    method: 'post',
    data
  });
}
/**
 * 发送邮箱验证码
 * @example
 * {
 *  "userEmail": "wang59651@163.com"
 * }
 * @returns
 */
export function sendEmail(data) {
  return request({
    url: '/moafly/customer/verificationCode',
    method: 'post',
    data
  });
}
// 修改用户信息
export function updateInfo(data) {
  return request({
    url: '/moafly/customer/edit',
    method: 'post',
    data
  });
}
//获取用户列表
export function getUserList(data) {
  return request({
    url: '/moafly/customer/list',
    method: 'post',
    data
  });
}
//删除用户
export function removeCustomer(userId) {
  return request({
    url: '/moafly/customer/remove/' + userId,
    method: 'get'
  });
}
//退出登录
export function logOut() {
  return request({
    url: '/api/user/logout',
    method: 'post'
  });
}

//重置密码
export function resetPass(data) {
  return request({
    url: '/api/moafly/user/findpassword',
    method: 'post',
    data
  });
}

//判断token是否有效
export function checkIfTokenValid() {
  return request({
    url: '/moafly/customer/tokenCheck',
    method: 'get'
  });
}
//修改用户基本信息
//重置密码
export function editUserInfo(data) {
  return request({
    url: '/moafly/customer/edit/userInfo',
    method: 'post',
    data
  });
}
//游客信息提交
export function addTourist(data) {
  return request({
    url: '/moafly/tourist/add',
    method: 'post',
    data
  });
}
//游客信息列表
export function getTourist(data) {
  return request({
    url: '/moafly/tourist/list',
    method: 'post',
    data
  });
}