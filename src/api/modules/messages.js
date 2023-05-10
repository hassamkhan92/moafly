import request from '@/util/request';

export function postSellerMessage(data) {
  return request({
    url: '/moafly/houseInfoConsultation/customerSend',
    method: 'post',
    data
  });
}

export function replyMessage(data) {
  return request({
    url: '/moafly/houseInfoConsultation/landlordReply',
    method: 'post',
    data
  });
}

export function getBuyMessagesList(data) {
  return request({
    url: '/moafly/houseInfoConsultation/customerSendList',
    method: 'post',
    data
  });
}

export function getSellMessagesList(data) {
  return request({
    url: '/moafly/houseInfoConsultation/landlordReplyList',
    method: 'post',
    data
  });
}
