/*
 * @Author: zulezhe
 * @Date: 2022-12-21 21:54:30
 * @LastEditors: zulezhe
 * @LastEditTime: 2023-02-19 10:24:05
 * @Path: https://gitee.com/zulezhe/
 * @Description:
 */
import { Message, Notification } from 'element-ui';
import router from '@/router';
import store from '@/store';
import * as api from '@/api/index';
const dictData = {
  StructureType: [],
  View: [],
  CommonInterest: [],
  PropertySubType: [],
  LotFeatures: [],
  SeniorCommunity: [],
  Levels: [],
  Cooling: [],
  RoomType: [],
  Sewer: [],
  PoolFeatures: [],
  PowerProduction: [],
  GreenValidation: [],
  CommonWalls: [],
  CommunityFeatures: [],
  WaterSource: [],
  Laundry: [],
  Fireplace: []
};
export const SellRouterList = [
  {
    id: 1,
    path: '/sell/Address',
    iscomplete: true,
    title: 'Address'
  },
  {
    id: 2,
    path: '/sell/basics',
    iscomplete: true,
    title: 'Basic'
  },
  {
    id: 3,
    path: '/sell/features',
    iscomplete: true,
    title: 'Features'
  },
  {
    id: 4,
    path: '/sell/more-details',
    iscomplete: true,
    title: 'Advance Details'
  },
  {
    id: 5,
    path: '/sell/description',
    iscomplete: true,
    title: 'Description'
  },
  {
    id: 6,
    path: '/sell/photos',
    iscomplete: true,
    title: 'Photos'
  },
  {
    id: 7,
    path: '/sell/price',
    iscomplete: true,
    title: 'Price'
  },
  {
    id: 8,
    path: '/sell/listing-date',
    iscomplete: true,
    title: 'Listing Date'
  },
  {
    id: 9,
    path: '/sell/sale-sign',
    iscomplete: true,
    title: 'For Sale Sign'
  },
  {
    id: 10,
    path: '/sell/preview',
    iscomplete: true,
    title: 'Preview'
  }
];
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000;
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1];
    if (result.length > 0 && value < 10) {
      value = '0' + value;
    }
    return value || 0;
  });
  return timeStr;
}

export function formatTime(time, option) {
  time = +time * 1000;
  const d = new Date(time);
  const now = Date.now();

  const diff = (now - d) / 1000;

  if (diff < 30) {
    return '刚刚';
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前';
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前';
  } else if (diff < 3600 * 24 * 2) {
    return '1天前';
  }
  if (option) {
    return parseTime(time, option);
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分';
  }
}

/**
 * 对Date的扩展，将 Date 转化为指定格式的String
 * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * @example:
 * (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 * (new Date()).Format("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
 * (new Date()).Format("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
 * (new Date()).Format("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
 * (new Date()).Format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
 */

export function timeFormat(time, fmt = 'yyyy-MM-dd HH:mm:ss') {
  time = new Date(time);
  const o = {
    'M+': time.getMonth() + 1, // 月份
    'd+': time.getDate(), // 日
    'h+': time.getHours() % 12 === 0 ? 12 : time.getHours() % 12, // 小时
    'H+': time.getHours(), // 小时
    'm+': time.getMinutes(), // 分
    's+': time.getSeconds(), // 秒
    'q+': Math.floor((time.getMonth() + 3) / 3), // 季度
    S: time.getMilliseconds() // 毫秒
  };
  const week = {
    0: '/u65e5',
    1: '/u4e00',
    2: '/u4e8c',
    3: '/u4e09',
    4: '/u56db',
    5: '/u4e94',
    6: '/u516d'
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length > 1 ? (RegExp.$1.length > 2 ? '/u661f/u671f' : '/u5468') : '') + week[time.getDay() + '']);
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    }
  }
  return fmt;
}
/**
 * 时间分割
 * @param {*} startDate 开始时间
 * @param {*} endDate  结束时间
 * @param {*} amount   分割次数
 * @return {Array} temp 分割后的时间
 */
export function timeRange(startDate, endDate, amount) {
  const startTime = new Date(startDate);
  const endTime = new Date(endDate);
  const gap = (endTime - startTime) / amount;
  const temp = [];
  for (let i = 0; i < amount; i++) {
    startTime.setMilliseconds(startTime.getMilliseconds() + gap);
    temp[i] = timeFormat(new Date(startTime.getTime()));
  }
  return temp;
}
/**
 * 月份加减
 * @param {*} date
 * @param {*} months
 * @returns
 */
export function addMonths(yearMonthDay, monthNum) {
  let arr = yearMonthDay.split('-');//2020-08-19或2020-08
  let year = parseInt(arr[0]);
  let month = parseInt(arr[1]);
  month = month + monthNum;
  if (month > 12) {//月份加
    let yearNum = parseInt((month - 1) / 12);
    month = month % 12 == 0 ? 12 : month % 12;
    year += yearNum;
  } else if (month <= 0) {//月份减
    month = Math.abs(month);
    let yearNum = parseInt((month + 12) / 12);
    year -= yearNum;
  }
  month = month < 10 ? "0" + month : month;
  return year + "-" + month;
}

/**
 * 数组去重
 * @param {*} arr
 * @returns
 */
export const deduplication = arr => [...new Set(arr)];
/**
 * 保留非重复的数据
 * @param {Array} arr 处理的数组
 * @example
 *
 * filterNonUnique([1,2,2,3,4,1,2])
 * //[3, 4]
 */
export const filterNonUnique = arr => arr.filter(i => arr.indexOf(i) === arr.lastIndexOf(i));
/**
 * 保留重复的数据
 * @param {Array} arr 处理的数组
 * @example
 * saveUnique([1,2,2,3,4,1,2])
 * //[1, 2, 2, 1, 2]
 */
export const saveUnique = arr => arr.filter(i => arr.indexOf(i) !== arr.lastIndexOf(i));

/**
 * 查找数组中相等的项
 * @param {array} arr
 * @param {string} key
 * @param {any} val
 * @returns {any} ele
 */
export function findEqual(arr, key, val) {
  for (let i = 0; i < arr.length; i++) {
    const ele = arr[i];
    if (ele[key] === val) {
      return ele;
    }
  }
}
/**
 * 根据val查找数组对象中相同val的项,返回Object,根据id查找tree数据中相等数据label
 * @param {*} arr
 * @param {*} val
 * @returns
 */
export function findKeyValue(arr, val) {
  let obj;
  function test(arr) {
    arr.forEach(ele => (ele.id === val ? (obj = ele) : ele.children ? test(ele.children) : ''));
  }
  test(arr);
  return obj;
}
/**
 *  @description: 对象转 url
 *  @param {Object} obj 对象形式
 *  @return {String} 字符串 类似 news_id=144&scorce=seo
 *  @author: wangchaoxu
 *  @remark 有bug,参数有时间的话,会被格式化
 *
 */
export function jsonToUrl(obj) {
  obj = JSON.stringify(obj);
  return obj
    .replace(/:/g, '=')
    .replace(/"/g, '')
    .replace(/,/g, '&')
    .match(/\{([^)]*)\}/)[1];
}

/**
 * 去除对象中所有符合条件的对象
 * @param {Object} obj 来源对象
 * @param {Function} fn 函数验证每个字段
 */
export function compactObj(obj, fn) {
  for (const i in obj) {
    if (typeof obj[i] === 'object') {
      compactObj(obj[i], fn);
    }
    if (fn(obj[i])) {
      delete obj[i];
    }
  }
}
/**
 * 数组对象求和
 * @param {*} arr
 * @param  {...any} param
 * @returns
 */
export function objSum(arr, ...param) {
  const temp = {};
  arr.forEach(function (item, index) {
    for (const k in item) {
      if (param.includes(k)) {
        if (typeof item[k] === 'string') {
          item[k] = item[k] * 1;
        }
        if (temp[k]) {
          temp[k] += item[k];
        } else {
          temp[k] = item[k];
        }
      }
    }
  });
  return temp;
}
/**
 * 从数组中找到最接近的数
 * @param {Number}  val
 * @param {Array}   data
 * @return {Number} 最接近当前值的结果
 * @author: wangchaoxu
 */
export function findNearByArr(val, data) {
  if (data.includes) return val;
  data.push(val);
  const newArr = data.sort((a, b) => a - b);
  const pre = newArr[newArr.indexOf(val) - 1];
  const next = newArr[newArr.indexOf(val) + 1];
  return val - pre > next - val || val - pre === next - val ? next : pre;
}
/**
 * 验证上传数据类型
 * @param {*} str
 * @param {*} split
 * @returns
 */
export function lastSubstring(str, split) {
  if (str === undefined || str === null || split === undefined || split === null) {
    return '';
  }
  return str.substring(str.lastIndexOf(split) + 1);
}
/**
 * 验证上传文件
 * @param {*} files
 * @param {*} fileType
 * @param {*} fileSize
 * @returns
 */
export function checkFile1(files, fileType, fileSize) {
  let flag = true;
  let tip = '';
  // 文件过大
  if (files.size > fileSize * 1024 * 1024) {
    flag = false;
    tip = ' File more than' + fileSize + 'M';
  }
  // 文件类型不属于可上传的类型
  // console.log(lastSubstring(files.name, '.').toLowerCase());
  if (!fileType.includes(lastSubstring(files.name, '.').toLowerCase())) {
    flag = false;
    tip = 'File types cannot be uploaded';
  }
  if (!flag) {
    Message({
      message: tip,
      type: 'warning',
      offset: 100
    });
  }
  return flag;
}
/**
 * html反转义
 * @param {*} str
 * @returns
 */
export function escape2Html(str) {
  var arrEntities = { lt: '<', gt: '>', nbsp: ' ', amp: '&', quot: '"' };
  return str.replace(/&(lt|gt|nbsp|amp|quot);/gi, function (all, t) {
    return arrEntities[t];
  });
}
/**
 * 数字转千分位
 * @param {*} num
 */
export function numberFormat(num) {
  if (!num) return num;
  if (typeof num == 'number') num = num.toString();
  return `${numberParse(num.replace(/[^\d.]/g, ''))}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
/**
 * 千分位转普通数字
 * @param {*} num
 */
export function numberParse(num) {
  return num && num.toString().replace(/\$\s?|(,*)/g, '');
}
/**
 * 数字转成 k,w之类结尾的数
 * @param {*} num
 */
export function formatNumber(num) {
  if (num < 1e3) {
    return num;
  } else if (num >= 1e3 && num < 1e6) {
    return (num / 1e3).toFixed(1) + 'K';
  } else {
    return (num / 1e6).toFixed(1) + 'M';
  }
}
/**
 * 去除千分位
 * @param {*} num
 * @returns
 */
export function delcommafy(num) {
  if (!num) return num;
  num = num.toString();
  num = num.replace(/,/gi, '');
  return num;
}
/**
 * 通知消息
 * @param {*} title
 * @param {*} types
 */
export function notify(title, types) {
  Notification({
    customClass: 'moafly-notify',
    iconClass: 'moafly-icon',
    message: title,
    type: types,
    offset: 100,
    duration: 2000,
    showClose: false
  });
}
/**
 * 判断数据类型
 * @param {*} type
 * @param {*} data
 * @returns
 */
export function isType(type, data) {
  if (!data) {
    return false;
  } else if (typeof data != type) {
    return false;
  } else {
    return true;
  }
}
/**
 * 监听滚动函数
 * @param {*} callback
 */
export function onScroll(callback) {
  window.onscroll = function (e) {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    callback(scrollTop);
  };
}
/**
 * 查询房屋详情
 * homeId //房屋id
 * step 所在页面步骤
 */
export function getHomeInfo(homeId) {
  return new Promise((reslove, reject) => {
    api.home.getHomeDetail(homeId).then(response => {
      if (response.code == 'K-000000') {
        if (response.context && response.context.houseInfoVO.houseId) {
          store.commit('SET_HOME_INFO', response.context.houseInfoVO);
          //获取已上传步骤
          let stepStr = response.context.houseInfoVO.houseStep;
          //转化数组
          let stepList = stepStr.split(',');
          //循环数组标记未完成步骤
          SellRouterList.forEach(item => {
            if (stepList.includes(item.id.toString())) {
              item.iscomplete = true; //已完成
            } else {
              item.iscomplete = false; //未完成
            }
          });
          store.commit('SET_SELL_MENULIST', SellRouterList);
          //判断第9步未完成最后一步不显示
          //   if (!stepList.includes('9')) {
          //     let sellMenuList = SellRouterList.filter(item => item.title != 'Preview');
          //     store.commit('SET_SELL_MENULIST', sellMenuList);
          //   } else {
          //     store.commit('SET_SELL_MENULIST', SellRouterList);
          //   }
        } else {
          let sellMenuList = SellRouterList.filter(item => item.title == 'Address');
          sellMenuList.forEach(item => {
            item.iscomplete = false;
          });
          store.commit('SET_SELL_MENULIST', sellMenuList);
          router.push('/sell/Address');
        }
        reslove(response.context);
      } else {
        reject(response.context);
      }
    });
  });
}
/**
 * 新增房屋
 */
export function addHomeInfo(data) {
  return new Promise((reslove, reject) => {
    api.home.addHome(data).then(response => {
      if (response.code == 'K-000000') {
        reslove(true);
      } else {
        reject(false);
      }
    });
  });
}
//相同属性赋值
export const listAssign = (arrA, arrB) =>
  Object.keys(arrA).forEach(key => {
    if (key == 'houseStep') {
      //
    } else {
      arrA[key] = arrB[key] || arrA[key];
    }
  });
//判断步骤字段
export function viladStep(stepStr, nowStep) {
  let stepList = stepStr.split(',');
  if (stepList.includes(nowStep)) {
    return stepList.join(',');
  } else {
    stepList.push(nowStep);
    return stepList.join(',');
  }
}
//去除数组交集
export function removeComNum(A, B) {
  let aSet = new Set(A);
  let bSet = new Set(B);
  let differenceSet = new Set([...aSet].filter(x => !bSet.has(x)));
  return Array.from(differenceSet);
}
//获取数据字典数据
export function getSystemList() {
  let queryParams = {
    pageNum: 1,
    pageSize: 1000
  };
  //根据获取数据字典分类存储
  api.dict.listData(queryParams).then(response => {
    let typeList = response.context.dataContent;
    for (let key in dictData) {
      dictData[key] = typeList.filter(item => key == item.configType);
      dictData[key] = dictData[key].map(item => {
        return item.configValue;
      });
    }
    //存入vuex持久化
    store.commit('SET_SYSTEMLIST', dictData);
  });
}
/**
 *根据传入value值获取对应text值
 * @param {*value Number||String}
 * @param {* arr Array}
 * @returns
 */
export function getArrayText(value, arr) {
  let text = '';
  arr.forEach(item => {
    if (value == item.value) {
      text = item.text;
    }
  });
  return text;
}
/**
 * 字符串转化数组
 */
export function StringToArray(strValue) {
  if (!strValue) {
    return '';
  }
  return strValue.split(',');
}
/**
 * 字符串单词首字母大写
 * @param {*} str
 * @returns
 */
export function titleCase5(str) {
  if (!str || typeof str !== 'string') return;
  return str.toLowerCase().replace(/( |^)[a-z]/g, L => L.toUpperCase());
}

export function debounce(fn, delay = 1000) {
  let timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments); // 把参数传进去
    }, delay);
  };
}
/**
 * 节流
 */
export function throttle(fn, delay = 200) {
  let timer = null;
  return function () {
    if (timer) return;
    timer = setTimeout(() => {
      fn.apply(this, arguments);
      timer = null;
    }, delay);
  };
}

/**
 * 数组求和
 */
export function getArrayTotalNums(arr, key) {
  if (arr && arr.length) {
    return arr.reduce((cur, item) => {
      return cur + item[key];
    }, 0);
  } else {
    return 0;
  }
}
/**
 * 判断表单字段是否符合提交条件
 */
export function getFormKeysRules(ruleData, data) {
  ruleData.forEach(item => {
    item.value = data[item.key];
  });
  let disabled = ruleData.every(item => item.value);
  return !disabled;
}
