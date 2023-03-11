/*
 * @Author: zulezhe
 * @Date: 2022-12-19 13:29:05
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-12-21 20:21:13
 * @Path: https://gitee.com/zulezhe/
 * @Description:
 */
import Vue from 'vue';
import './init';
import App from './App.vue';
import store from './store';
import dayjs from 'dayjs';
import pagination from '@/components/Pagination';
import Skeleton from '@/components/Skeleton';
import Footer from '@/components/footer';
import Message from '@/components/message/message.js';
import infiniteScroll from 'vue-infinite-scroll';
import router from './router';
Vue.prototype.$message = Message;
Vue.use(infiniteScroll);
var isoWeek = require('dayjs/plugin/isoWeek');
dayjs.extend(isoWeek);
Vue.prototype.dayjs = dayjs; //可以全局使用dayjs
dayjs.locale('en');
Vue.config.productionTip = false;
Vue.component('pagination', pagination);
Vue.component('Footer', Footer);
Vue.component('Skeleton', Skeleton);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
