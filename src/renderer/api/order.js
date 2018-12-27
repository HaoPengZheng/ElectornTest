import request from '@/utils/request'

/**
 *
 * @date 2018-12-27
 * @export
 * @param {*} query
 * @returns
 */
export function getOrders (query) {
  return request({
    url: '/orders',
    method: 'get',
    params: query
  })
}

/**
 *
 *
 * @date 2018-12-27
 * @export
 */
export function getOrderDetail (orderId) {
  return request({
    url: '/orders/' + orderId + '/details',
    method: 'get'
  })
}
