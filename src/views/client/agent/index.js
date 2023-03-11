/*
 * @Author: zulezhe
 * @Date: 2021-12-20 20:39:11
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-08-08 22:28:01
 * @Path: https://gitee.com/zulezhe/
 * @Description:中介函数
 */
/**
 * 格式化中介所需数据
 * @param {*} data
 * @example
 *  {
 *        id: 3,
 *        name: 'Jessica Ranuschio',
 *        avatar: require('@/assets/images/agent/agent-avatar.png'),
 *        rate: 4,
 *        price: '50 USD / hour',
 *        address: 'Los Angeles, California',
 *        description:
 *          'Buying a home is a huge investment, and an exciting experience. I make sure to provide superior service to all my clients by being direct and honest. Communication is key; therefore, I assure to teach each step in the home buying process. My clients are my number one focus,needed.'
 *      }
 */
export function formatData(data) {
  let newData = [];
  data.map(item => {
    newData.push({
      id: item.agentId,
      name: item.agentName,
      avatar: item.agentHeaderImg,
      rate: Number(item.agentScore),
      price: item.agentPrice,
      address: item.agentLocation,
      description: item.agentIntroduce,
      ...item
    });
  });
  return newData;
}
