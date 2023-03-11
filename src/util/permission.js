import NProgress from 'nprogress'; // 进度条
import 'nprogress/nprogress.css';
import getPageTitle from '@/util/get-page-title';
import store from '@/store';
import router from '@/router';
import { getToken } from '@/util/auth';
// import { getAuthToken } from '@/shared/utils/index.js';
const whiteList = ['/signup', '/login', '/resetPassword'];
router.beforeEach(async (to, from, next) => {
  NProgress.start(); // 加载进度条
  document.title = getPageTitle(to.meta.title); // 设置document title
  const hasUserToKen = getToken(); //判断用户是否登陆
  const userType = store.getters.userInfo?.roleId;
  if (hasUserToKen && userType === 1) {
    //token='eyJhbGciOiJIUzI1NiJ9.eyJyb2xlSWQiOjEsImlwIjoiMTkyLjE2OC4xMC4xMDIiLCJjdXN0b21lcklkIjo5NywiY3VzdG9tZXJOYW1lIjoidGVzdDAwM0Btb2FmbHkuY29tIiwiaWF0IjoxNjY3MDQxMjUxLCJleHAiOjE2Njc2NDYwNTF9.849qL3AtbWPpSlApuruJKTfDaw3RSQuZfd8QSvk1nog
    if (whiteList.includes(to.fullPath)) {
      next('/');
      setTimeout(() => {
        NProgress.done();
      }, 500);
    } else {
      next();
    }
    // ***************
    // const isCanToken = await getAuthToken();
    // if (isCanToken) {
    //   if (whiteList.includes(to.fullPath)) {
    //     next('/');
    //     setTimeout(() => {
    //       NProgress.done();
    //     }, 500);
    //   } else {
    //     next();
    //   }
    // } else {
    //   store.commit('doRemove');
    //   next('/');
    // }
  } else {
    if (!to.meta.needLogin) {
      next();
    } else {
      NProgress.done();
      store.dispatch('doRemove');
      next('/login');
    }
  }
});
// 路由跳转完成后
router.afterEach(() => {
  NProgress.done();
});
