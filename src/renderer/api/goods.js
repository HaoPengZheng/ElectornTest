// import request from '@/utils/request'
import axios from 'axios'
import store from '@/store'

// 获取商品信息
export function goods (query) {
  // return request({
  //   url: '/goods',
  //   method: 'get',
  //   params: query
  // })
  return new Promise(function (resolve, reject) {
    axios({
      method: 'GET',
      url: store.getters.getBaseApi + '/goods?type_id=' + query.type_id
    }).then(resp => {
      resolve(resp)
    }).catch(err => {
      reject(err)
    })
  })
}
