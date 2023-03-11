import Vue from 'vue';
import VueText from '@/components/VueText';
const component = {
  install: function(Vue) {
    Vue.component('VueText', VueText);
  }
};
Vue.use(component);
