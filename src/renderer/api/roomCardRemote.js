import axios from 'axios'

const RemoteAddress = 'http://120.79.66.188:22347/v1'
const Appid = '15446726785411'
const Secret = '15446726785412'
const PhoneNum = '15919289957'

// 获取token
export function getToken () {
  return new Promise(function (resolve, reject) {
    axios({
      method: 'GET',
      url: RemoteAddress + '/token?' +
      'appid=' + Appid +
      '&secret=' + Secret
    }).then(resp => {
      resolve(resp)
    }).catch(err => {
      reject(err)
    })
  })
}

// 发卡
export function setRoomCard (data) {
  return new Promise(function (resolve, reject) {
    getToken().then(response => {
      if (response.data.code === 0) {
        axios({
          method: 'GET',
          url: RemoteAddress + '/setting-card-password?' +
          'appid=' + Appid +
          '&roomnu=' + data.roomNum +
          '&keyvalue=' + data.keyValue +
          '&keytype=0' +
          '&expire-date=' + data.expireDate +
          '&time-type=1' +
          '&nickname=' + data.keyValue +
          '&phonenum=' + PhoneNum +
          '&requestid=1' +
          '&token=' + response.data.token
        }).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      } else {
        resolve(response)
      }
    }).catch(reason => {
      reject(reason)
    })
  })
}

// 取消卡
export function cancelRoomCard (data) {
  return new Promise(function (resolve, reject) {
    getToken().then(response => {
      if (response.data.code === 0) {
        axios({
          method: 'GET',
          url: RemoteAddress + '/cancel-card-password?' +
          'appid=' + Appid +
          '&roomnu=' + data.roomNum +
          '&keyvalue=' + data.keyValue +
          '&keytype=0' +
          '&requestid=1' +
          '&token=' + response.data.token
        }).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      } else {
        resolve(response)
      }
    }).catch(reason => {
      reject(reason)
    })
  })
}

// 开门
export function openDoor (data) {
  return new Promise(function (resolve, reject) {
    getToken().then(response => {
      if (response.data.code === 0) {
        axios({
          method: 'GET',
          url: RemoteAddress + '/open-door?' +
          'appid=' + Appid +
          '&roomnu=' + data.roomNum +
          '&phonenum=' + PhoneNum +
          '&method=1' +
          '&requestid=1' +
          '&token=' + response.data.token
        }).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      } else {
        resolve(response)
      }
    }).catch(reason => {
      reject(reason)
    })
  })
}

// 设置锁状态（正常/常开/长关）
export function devNoncSet (data) {
  return new Promise(function (resolve, reject) {
    getToken().then(response => {
      if (response.data.code === 0) {
        axios({
          method: 'GET',
          url: RemoteAddress + '/dev-nonc-set?' +
          'appid=' + Appid +
          '&roomnu=' + data.roomNum +
          '&actiontype=' + data.actionType +
          '&devtype=0' +
          '&requestid=1' +
          '&token=' + response.data.token
        }).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      } else {
        resolve(response)
      }
    }).catch(reason => {
      reject(reason)
    })
  })
}

// 设备复位
export function devReset (data) {
  return new Promise(function (resolve, reject) {
    getToken().then(response => {
      if (response.data.code === 0) {
        axios({
          method: 'GET',
          url: RemoteAddress + '/dev-reset?' +
          'appid=' + Appid +
          '&roomnu=' + data.roomNum +
          '&requestid=1' +
          '&token=' + response.data.token
        }).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      } else {
        resolve(response)
      }
    }).catch(reason => {
      reject(reason)
    })
  })
}

// 信号测试
export function devSingalTest (data) {
  return new Promise(function (resolve, reject) {
    getToken().then(response => {
      if (response.data.code === 0) {
        axios({
          method: 'GET',
          url: RemoteAddress + '/dev-signal-test?' +
          'appid=' + Appid +
          '&roomnu=' + data.roomNum +
          '&requestid=1' +
          '&token=' + response.data.token
        }).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      } else {
        resolve(response)
      }
    }).catch(reason => {
      reject(reason)
    })
  })
}
