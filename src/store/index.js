import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import getters from './getters';
import user from './modules/user';
import sell from './modules/sell';
import error from './modules/error';
import task from './modules/task';

export default new Vuex.Store({
  id: '',
  getters,
  modules: {
    user,
    sell,
    error,
    task
  }
});
