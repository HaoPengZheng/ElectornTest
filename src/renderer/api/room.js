import request from '@/utils/request'

// 获取房态列表
export function getRoomSurplus (query) {
  return request({
    url: '/roomsurplus',
    method: 'get',
    params: query
  })
}

// 获取店内房间信息（带缓存）
export function hrooms (query) {
  return request({
    url: '/shops/hrooms',
    method: 'get',
    params: query
  })
}

// 获取线上店内房间信息
export function getShopsRooms (query) {
  return request({
    url: '/shops/rooms',
    method: 'get',
    params: query
  })
}

// 房间入住业务
export function checkIn (query) {
  return request({
    url: '/checkIn',
    method: 'POST',
    data: query
  })
}

// 根据shop Id 获取房型
export function roomtypes (id) {
  return request({
    url: `/roomtypes/${id}`,
    method: 'get'
  })
}

export function cleanRoomsCache () {
  return request({
    url: '/cleanRoomsCache',
    method: 'POST'
  })
}
