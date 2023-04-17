/*
 * @Author: zulezhe
 * @Date: 2022-12-21 21:54:30
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-12-25 18:42:36
 * @Path: https://gitee.com/zulezhe/
 * @Description:
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import ClientLayout from '@/views/client/layout';
import clientRoute from './client';
Vue.use(VueRouter);
//解决编程式路由往同一地址跳转时会报错的情况
const originalPush = VueRouter.prototype.push;
const originalReplace = VueRouter.prototype.replace;
// push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};
//replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject);
  return originalReplace.call(this, location).catch(err => err);
};
export const routes = [
  {
    path: '/',
    component: ClientLayout,
    name: 'client',
    meta: { title: 'client', needLogin: true /*需要加校检判断的路由*/ },
    redirect: '/home',
    children: clientRoute
  },
  { path: '*', component: () => import('@/views/error/index.vue'), name: '404', meta: { title: '404', needLogin: false /*需要加校检判断的路由*/ } } //全不匹配的情况下，返回404，路由按顺序从上到下，依次匹配。最后一个*能匹配全部，
];
const router = new VueRouter({
  base: process.env.BASE_URL,
  mode: 'history', // 注意添加这一项
  routes
});
export default router;
