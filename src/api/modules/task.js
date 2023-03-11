import request from '@/util/request';
//用户新增任务
export function UserAddTask(data) {
  return request({
    url: '/moafly/task/addTask',
    method: 'post',
    data
  });
}
//用户修改任务接口
export function UserUpdateTask(data) {
  return request({
    url: '/moafly/task/editTask',
    method: 'post',
    data
  });
}
//用户修改任务状态接口
export function EditTaskState(data) {
  return request({
    url: '/moafly/task/editTaskState',
    method: 'post',
    data
  });
}
//任务列表
export function listTask(data) {
  return request({
    url: '/moafly/task/listTask',
    method: 'post',
    data
  });
}
//任务详情
export function taskDetail(data) {
  return request({
    url: '/moafly/task/detail/' + data,
    method: 'get'
  });
}
//发出任务邀请(非正式)
export function addTaskInvite(data) {
  return request({
    url: '/moafly/taskInvite/add',
    method: 'post',
    data
  });
}

export function taskInviteList(data) {
  return request({
    url: '/moafly/taskInvite/list/customer',
    method: 'post',
    data
  });
}
// proposal列表
export function proposalList(data) {
  return request({
    url: '/moafly/proposal/list',
    method: 'post',
    data
  });
}
//用户邀请中介列表
export function taskInviteSalesAgentList(data) {
  return request({
    url: '/moafly/customerSalesRelation/list',
    method: 'post',
    data
  });
}
