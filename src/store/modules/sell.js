import { setSystemList, setHomeInfo, setSellMenu, setSellHomeId } from '@/util/auth';
const state = () => ({
  homeInfo: {},
  sellMenuList: [],
  systemList: {},
  hoseId: ''
});
const mutations = {
  //将form提交房屋信息保存到vuex
  changePercentage(state, val) {
    state.changePercentage = val;
  },
  SET_HOME_ID(state, hoseId) {
    state.hoseId = hoseId;
    setSellHomeId(hoseId);
  },
  SET_HOME_INFO(state, data) {
    let homeInfo = Object.assign({}, state.homeInfo, data);
    state.homeInfo = homeInfo;
    setHomeInfo(data);
  },
  SET_SELL_MENULIST(state, data) {
    state.sellMenuList = data;
    setSellMenu(data);
  },
  SET_SYSTEMLIST(state, data) {
    state.systemList = data;
    setSystemList(data);
  }
};
const actions = {
  //储存房屋详情
  setStorgeHomeInfo({ commit }, data) {
    commit('SET_HOME_INFO', data);
  }
};
export default {
  state,
  mutations,
  actions
};
