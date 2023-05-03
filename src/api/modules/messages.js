import request from '@/util/request';

export function postSellerMessage(data) {
  return request({
    url: '/moafly/houseInfoConsultation/customerSend',
    method: 'post',
    data
  });
}
