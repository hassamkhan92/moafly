import Vue from 'vue';
import { timeFormat, numberFormat, formatNumber } from '@/util';

const filters = {
  timeFormat,
  numberFormat,
  formatNumber
};
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
