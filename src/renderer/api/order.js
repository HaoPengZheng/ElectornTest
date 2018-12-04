import request from '@/utils/request'

// 获取订单列表
export function getOrders (query) {
  return request({
    url: '/orders',
    method: 'get',
    params: query
  })
}
