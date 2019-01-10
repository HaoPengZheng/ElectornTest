import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
// import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: store.getters.getBaseApi, // api的base_url
  timeout: 30000 // request timeout
})

service.interceptors.request.use(config => {
  config.headers['company'] = store.getters.getCompanyId
  config.headers['shop'] = store.getters.getShopId
  if (store.getters.token) {
    // config.headers['X-Token'] = getToken()
  }
  return config
}, error => {
  console.log(error) // for debug
  Promise.reject(error)
})

service.interceptors.response.use(
  response => response,
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 10 * 1000
    })
    return Promise.reject(error)
  })

export default service
