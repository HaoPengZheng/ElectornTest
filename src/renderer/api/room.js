import request from '@/utils/request'
import axios from 'axios'

// 获取房态列表
export function getRoomSurplus (query) {
  return request({
    url: '/roomsurplus',
    method: 'get',
    params: query
  })
}

// 获取房间日预定状态
export function roomDayStatus (query) {
  return request({
    url: '/roomdaystatus',
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

// 清理缓存
export function cleanRoomsCache () {
  return request({
    url: '/cleanRoomsCache',
    method: 'POST'
  })
}

// 获取房间下单的商品类型
export function getRoomGoods () {
  return new Promise(function (resolve, reject) {
    axios.get('http://192.168.101.128/oqc/index.php/66/?app=api&mod=RoomService&act=getRoomGoods&shop_id=49&company_id=66').then(resp => {
      resolve(resp)
    }).catch(err => {
      reject(err)
    })
  })
}

// 客房服务下单
export function addRoomOrder (data) {
  return new Promise(function (resolve, reject) {
    axios.post('http://192.168.101.128/oqc/index.php/66/?app=api&mod=RoomService&act=addRoomOrder', data).then(resp => {
      console.log(resp)
      resolve(resp)
    }).catch(err => {
      reject(err)
    })
  })
}
