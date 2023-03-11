import * as api from '@/api';

/**
 * 验证token是否失效
 */
export async function getAuthToken() {
  let tokenValid = false;
  await api.user
    .checkIfTokenValid()
    .then(res => {
      if (res.code == 'K-000000') {
        //token有效
        tokenValid = true;
      } else if (res.code == 'K-000001') {
        tokenValid = false;
      }
    })
    .catch(error => {
      console.log('error', error);
      tokenValid = false;
    });

  return tokenValid;
}
/**
 * 判断当前路由是否在在权限内
 */
export function getVilidMenu(sidebarRouters, path) {
  let isCanRouter = false;
  let validRouters = getRoutersArrays(sidebarRouters);
  if (validRouters.includes(path)) {
    isCanRouter = true;
  }
  return isCanRouter;
}
/**
 *
 * @param {*} sidebarRouters
 * @returns 获得一个路由集合列表
 */
function getRoutersArrays(sidebarRouters) {
  let routerArray = [];
  sidebarRouters.forEach(item => {
    if (item.subMenuInfoList) {
      routerArray = routerArray.concat(item.subMenuInfoList);
    }
    routerArray.push(item);
  });
  return routerArray.map(item => {
    return item.menuUrl;
  });
}
