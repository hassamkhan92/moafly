import { setTaskInfo } from '@/util/auth';
const state = () => ({
  taskInfo: {} //任务详情
});
const mutations = {
  setTaskInfo(state, taskInfo) {
    state.taskInfo = taskInfo;
    setTaskInfo(taskInfo);
  }
};
const actions = {};
export default {
  state,
  mutations,
  actions
};
