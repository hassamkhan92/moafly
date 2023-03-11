/*
 * @Author: zulezhe
 * @Date: 2022-11-17 20:39:23
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-12-29 23:00:51
 * @Path: https://gitee.com/zulezhe/
 * @Description:
 */
import axios from 'axios';
import { MessageBox, Message } from 'element-ui';
import { getToken } from '@/util/auth';
import { debounce } from "@/util/index"
import store from '@/store';
import router from '@/router';
const serveErrorWriteRouteList = ['/moafly/thirdHouse/moestimate'];
// 创建axios实例
const service = axios.create({
  baseURL: process.env.NODE_ENV == 'production' ? '' : '',
  timeout: 1000 * 6 * 10, //超时参数 60S
  retry: 3,//设置全局请求次数
  retryDelay: 1000//请求间隔
});
/**
 * 请求拦截函数
 */
service.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) config.headers.token = token;
    return config;
  },
  error => {
    console.log('请求拦截错误===>', error);
    return Promise.reject(error);
  }
);
/**
 * 响应拦截
 */
service.interceptors.response.use(
  response => {
    const res = response.data;
    // 和后台约定好,请求成功返回的标识
    if (response.status !== 200) {
      return Promise.reject(new Error(res.message || 'Error'));
    } else {
      if (res.code === 'K-000099') debounce(handleLogOut)
      // if (res.code === 'K-000099') handleLogOut()
      return res;
    }
  },
  error => {
    //超时处理
    var config = error.config;
    if (!config || !config.retry) return Promise.reject(error);
    // 设置用于跟踪重试次数的变量
    config.__retryCount = config.__retryCount || 0;

    // 检查我们是否已将重试总数最大化
    if (config.__retryCount >= config.retry) {
      // 错误拒绝
      return Promise.reject(error);
    }
    // 增加重试次数
    config.__retryCount += 1;
    // 创造新的承诺来处理指数退避
    var backoff = new Promise(function (resolve) {
      setTimeout(function () {
        resolve();
      }, config.retryDelay || 1);
    });
    // 返回承诺，其中将撤回axios以重试请求
    return backoff.then(function () {
      return axios(config);
    });
  }
);

function handleLogOut() {
  MessageBox.confirm('You have not logged in yet', 'Confirm logout', {
    confirmButtonText: 'Login',
    cancelButtonText: 'Cancel',
    type: 'warning'
  }).then(() => {
    store.dispatch('doRemove');
    router.replace('/login');
  });
}
export default service;
