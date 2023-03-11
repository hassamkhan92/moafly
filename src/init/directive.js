import Vue from 'vue';
import * as Directives from '@/directives';
const directives = {
  install(Vue) {
    Object.keys(Directives).forEach(key => {
      Vue.directive(key, Directives[key]);
    });
  }
};
Vue.use(directives);
