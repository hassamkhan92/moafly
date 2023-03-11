/**
 * 通用js方法封装处理
 * Copyright (c) 2019 ruoyi
 */
import Message from '@/components/message/message.js';
import * as api from '@/api';
import { setStorage, getStorage } from '@/util/storage.js';
import Is from '@/util/is.js';
const baseURL = process.env.VUE_APP_BASE_API;

// 日期格式化
export function parseTime(time, pattern) {
  if (arguments.length === 0 || !time) {
    return null;
  }
  const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time);
    } else if (typeof time === 'string') {
      time = time.replace(new RegExp(/-/gm), '/');
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000;
    }
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
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value];
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value;
    }
    return value || 0;
  });
  return time_str;
}

// 表单重置
export function resetForm(that, refName) {
  if (that.$refs[refName]) {
    that.$refs[refName].resetFields();
  }
}

// 添加日期范围
export function addDateRange(params, dateRange) {
  var search = params;
  search.beginTime = '';
  search.endTime = '';
  if (null != dateRange && '' != dateRange) {
    search.beginTime = this.dateRange[0];
    search.endTime = this.dateRange[1];
  }
  return search;
}

// 回显数据字典
export function selectDictLabel(datas, value) {
  var actions = [];
  Object.keys(datas).map(key => {
    if (datas[key].dictValue == '' + value) {
      actions.push(datas[key].dictLabel);
      return false;
    }
  });
  return actions.join('');
}

// 通用下载方法
export function download(fileName) {
  window.location.href = baseURL + '/common/download?fileName=' + encodeURI(fileName) + '&delete=' + true;
}

// 字符串格式化(%s )
export function sprintf(str) {
  var args = arguments,
    flag = true,
    i = 1;
  str = str.replace(/%s/g, function() {
    var arg = args[i++];
    if (typeof arg === 'undefined') {
      flag = false;
      return '';
    }
    return arg;
  });
  return flag ? str : '';
}

// 转换字符串，undefined,null等转化为""
export function praseStrEmpty(str) {
  if (!str || str == 'undefined' || str == 'null') {
    return '';
  }
  return str;
}

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 * @param {*} rootId 根Id 默认 0
 */
export function handleTree(data, id, parentId, children, rootId) {
  id = id || 'id';
  parentId = parentId || 'parentId';
  children = children || 'children';
  rootId = rootId || 0;
  //对源数据深度克隆
  const cloneData = JSON.parse(JSON.stringify(data));
  //循环所有项
  const treeData = cloneData.filter(father => {
    let branchArr = cloneData.filter(child => {
      //返回每一项的子级数组
      return father[id] === child[parentId];
    });
    branchArr.length > 0 ? (father.children = branchArr) : '';
    //返回第一层
    return father[parentId] === rootId;
  });
  return treeData != '' ? treeData : data;
}
/**
 *
 * @param {Array} arrs 树形数据
 * @param {string} childs 树形数据子数据的属性名,常用'children'
 * @param {Array} attrArr 需要提取的公共属性数组(默认是除了childs的全部属性)
 * @returns
 */
export function extractTree(arrs, childs, attrArr) {
  let attrList = [];
  if (!Array.isArray(arrs) && !arrs.length) return [];
  if (typeof childs !== 'string') return [];
  if (!Array.isArray(attrArr) || (Array.isArray(attrArr) && !attrArr.length)) {
    attrList = Object.keys(arrs[0]);
    attrList.splice(attrList.indexOf(childs), 1);
  } else {
    attrList = attrArr;
  }
  let list = [];
  const getObj = arr => {
    arr.forEach(function(row) {
      let obj = {};
      attrList.forEach(item => {
        obj[item] = row[item];
      });
      list.push(obj);
      if (row[childs]) {
        getObj(row[childs]);
      }
    });
    return list;
  };
  return getObj(arrs);
}
/**
 * 调用接口查询绑定信息
 */
export function getPayInfo() {
  return new Promise((reslove, reject) => {
    api.pay
      .payMethodList()
      .then(res => {
        if (res.code === 'K-000000' && Is.array(res.context) && !Is.arrayEmpty(res.context)) {
          reslove(res.context[0]);
        } else {
          reslove(false);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}
//判断值是否为空
export function isEmpty(value) {
  return value ? value : '';
}
//用户确认付款接口
export function confirmSubmit(data) {
  return new Promise((reslove, reject) => {
    api.pay
      .confirmSubmit(data)
      .then(res => {
        if (res.code === 'K-000000' && res.context) {
          Message.success('Confirmation of successful payment');
          console.log('res.context===>', res.context);
          reslove(res.context);
        } else {
          Message.error('Confirmation of filed payment');
          reslove(false);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}
/**
 * 验证接口返回数据方法
 */
export function getViliedRequestBackValue(data, type = 'Array') {
  if (type === 'Array') {
    return data.code === 'K-000000' && data.context.dataContent && Is.array(data.context.dataContent);
  }
  if (type === 'Object') {
    return data.code === 'K-000000' && data.context && Is.obj(data.context);
  }
}
//存储支付成功后的链接地址
const linkey = 'LINK';
export function setSessionPayLink(value) {
  return setStorage(linkey, value, false);
}
export function getSessionPayLink() {
  return getStorage(linkey, false);
}
export const computeLineCount = () => {
  const hiddenContent = document.getElementsByClassName('hiddenContent')[0]; // 该文本所在的标签 因为标签很多，所以需要制定索引值Index

  // 获取实际文本样式（包含lineHeight和height,fontSize等等）
  let style = window.getComputedStyle(hiddenContent, null);
  let fontSize = style.fontSize;
  let lineHeight = (style.lineHeight === 'normal' ? fontSize : style.lineHeight).replace('px', '');
  let height = style.height.replace('px', '');
  console.log('height / lineHeight', height / lineHeight);
  if (height / lineHeight > 4) {
    return true;
  } else {
    return false;
  }
};
