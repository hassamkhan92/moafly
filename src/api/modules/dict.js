import request from '@/util/request';

// 查询字典数据列表
export function listData(data) {
  return request({
    url: '/moafly/systemConfig/list',
    method: 'POST',
    data: data
  });
}

// 查询字典数据详细
export function getData(dictCode) {
  return request({
    url: '/system/dict/data/' + dictCode,
    method: 'get'
  });
}

// 根据字典类型查询字典数据信息
export function getDicts(data) {
  return request({
    url: '/moafly/systemConfig/listByTypes',
    method: 'post',
    data: data
  });
}

// 新增字典数据
export function addData(data) {
  return request({
    url: '/moafly/systemConfig/add',
    method: 'post',
    data: data
  });
}

// 修改字典数据
export function updateData(data) {
  return request({
    url: '/moafly/systemConfig/edit',
    method: 'post',
    data: data
  });
}

// 删除字典数据
export function delData(dictCode) {
  return request({
    url: '/moafly/systemConfig/remove/' + dictCode,
    method: 'get'
  });
}
