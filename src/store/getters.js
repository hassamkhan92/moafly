import { getuserData, getTaskInfo, getSystemList, getHomeInfo, getSellMenu, getSellHomeId, getToken } from '@/util/auth';
const getters = {
  //   token: state => state.user.token,
  token: state => {
    state.user.token = getToken();
    return state.user.token;
  },
  userInfo: state => {
    state.user.userInfo = getuserData();
    return state.user.userInfo;
  },
  avatar: state => state.user.avatar,
  taskInfo: state => {
    state.task.taskInfo = getTaskInfo();
    return state.task.taskInfo;
  },
  homeInfo: state => {
    state.sell.homeInfo = getHomeInfo();
    return state.sell.homeInfo;
  },
  sellMenuList: state => {
    state.sell.sellMenuList = getSellMenu();
    return state.sell.sellMenuList;
  },
  systemList: state => {
    state.sell.systemList = getSystemList();
    return state.sell.systemList;
  },
  hoseId: state => {
    state.sell.hoseId = getSellHomeId();
    return state.sell.hoseId;
  },
  errorType: state => state.error.errorType
};
export default getters;
