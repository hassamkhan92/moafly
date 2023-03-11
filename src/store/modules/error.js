const state = () => ({
  errorType: '404' //错误类型
});
const mutations = {
  setErrorType(state, type) {
    state.errorType = type;
  }
};
const actions = {};
export default {
  state,
  mutations,
  actions
};
