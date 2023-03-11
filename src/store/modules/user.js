import { setToken, setuserData } from '@/util/auth';
import { login } from '@/api/modules/user';
import { getSystemList } from '@/util/index';
const state = () => ({
  userInfo: '',
  token: '',
  sidebar: {},
  avatar: ''
});
const mutations = {
  // 将登陆成功的token存入本地和vuex
  SET_TOKEN: (state, token) => {
    state.token = token;
    setToken(token);
  },
  // 登陆成功将用户信息存入本地
  SET_USER_INFO(state, data) {
    state.userInfo = data;
    state.avatar = data.headImg;
    setuserData(data);
  }
};
const actions = {
  doLogin({ commit }, data) {
    getSystemList();
    commit('SET_TOKEN', data.token);
    commit('SET_USER_INFO', data);
  },
  // 注册成功时将注册的账户密码存入vuex,同时调用登陆接口完成登陆
  doResIgn({ commit }, data) {
    return new Promise((resolve, reject) => {
      const { userEmail, password } = data;
      login({
        userEmail,
        password
      })
        .then(res => {
          if (res.code === 200) {
            commit('SET_TOKEN', res.data.token);
            resolve();
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  // 清除token
  doRemove({ commit }) {
    commit('SET_TOKEN', '');
    commit('SET_USER_INFO', {});
  }
};
export default {
  state,
  mutations,
  actions
};
