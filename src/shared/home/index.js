/*
 * @Author: zulezhe
 * @Date: 2022-04-09 21:38:40
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-12-01 22:02:37
 * @Path: https://gitee.com/zulezhe/
 * @Description:
 */
import OptionPlus from '@/shared/common/OptionPlus';
// 房屋状态，。
export const HomeStatusEnum = {
  WWC: new OptionPlus(0, 'Unfinished'), // 编辑未完成
  YWC: new OptionPlus(1, 'Complete'), // 编辑已经完成
  ZS: new OptionPlus(2, 'On Sale'), //在售
  QQXJ: new OptionPlus(3, 'Waiting'), //等待下架
  QQXG: new OptionPlus(4, 'Update'), //请求修改
  YXJ: new OptionPlus(5, 'Cancel'), //已下架
  YS: new OptionPlus(6, 'Sold') //已售
};

// 订单状态集合
export const HomeStatusOptions = (() => {
  const list = [];
  for (let key in HomeStatusEnum) {
    list.push(HomeStatusEnum[key]);
  }
  return list;
})();

/**
 * 根据房屋状态获取当前text
 * @param value {Number} 状态
 */
export function getHomeStatusOptionByValue(value) {
  const orderStatus = HomeStatusOptions.find(item => {
    return item.equalValue(value);
  });
  if (orderStatus) {
    return orderStatus;
  } else {
    return {};
  }
}

/**
 *  根据房屋状态 显示当前状态
 * @param {*} value  房屋状态 0编辑未完成 1编辑已完成 2在售 3已下架 4 合同状态
 * @returns
 */
export function clentHomeStatusByText(value) {
  const values = Number(value);
  if (values == 0) {
    return 'Draft';
  }
  if (values == 1) {
    return 'Awaiting contract';
  }
  if (values == 2) {
    return 'Live on moafly';
  }
  if (values == 3) {
    return 'Off market';
  }
  if (values == 4) {
    return 'Pending';
  }
}

/**
 * @param text 获取中介状态显示标题
 */
const agentStatus = {};
export function agentStatusByText(value) {
  const values = Number(value);
  if (values == 0) {
    return 'Coming Soon';
  }
  if (values == 1) {
    return 'Live on moafly';
  }
  /*    if (values == 2) {
    return 'Comming';
  }
  if (values == 4) {
    return 'Soon';
  } */
}
