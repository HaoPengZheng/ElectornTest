import axios from 'axios'

const RemoteAddress = 'http://120.79.66.188:22347/v1'

const HOST = 'http://119.23.235.135:8089'
const Appid = '15446726785411'
const Secret = '15446726785412'
const PhoneNum = '15919289957'
// 发卡
export function setRoomCard (data) {
  return new Promise(function (resolve, reject) {
    axios({
      method: 'POST',
      url: HOST + '/gomi/Door/settingCardPassword',
      data: {
        'appid': Appid,
        'secret': Secret,
        'roomnu': data.roomNum,
        'keyvalue': data.keyValue,
        'keytype': '0',
        'expireDate': data.expireDate,
        'requestid': '1',
        'timeType': '1',
        'nickname': '1',
        'phonenum': PhoneNum
      },
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }).then(resp => {
      resolve(resp)
    }).catch(err => {
      reject(err)
    })
  })
}

// 取消卡
export function cancelRoomCard (data) {
  return new Promise(function (resolve, reject) {
    axios({
      method: 'POST',
      url: HOST + '/gomi/Door/cancelCardPassword',
      data: {
        'appid': Appid,
        'secret': Secret,
        'roomnu': data.roomNum,
        'keyvalue': data.keyValue,
        'keytype': '0',
        'requestid': '1'
      },
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }).then(resp => {
      resolve(resp)
    }).catch(err => {
      reject(err)
    })
  })
}

// 开门
export function openDoor (data) {
  return new Promise(function (resolve, reject) {
    axios({
      method: 'POST',
      url: HOST + '/gomi/Door/openDoor',
      data: {
        'appid': Appid,
        'secret': Secret,
        'roomnu': data.roomNum,
        'requestid': '1',
        'method': '1',
        'phonenum': PhoneNum
      },
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }).then(resp => {
      resolve(resp)
    }).catch(err => {
      reject(err)
    })
  })
}

// 设置锁状态（正常/常开/长关）
export function devNoncSet (data) {
  return new Promise(function (resolve, reject) {
    axios({
      method: 'POST',
      url: HOST + '/gomi/Door/devNoncSet',
      data: {
        'appid': Appid,
        'secret': Secret,
        'roomnu': data.roomNum,
        'requestid': '1',
        'actiontype': data.actionType,
        'devtype': '0'
      },
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }).then(resp => {
      resolve(resp)
    }).catch(err => {
      reject(err)
    })
  })
}

// 设备复位
export function devReset (data) {
  return new Promise(function (resolve, reject) {
    axios({
      method: 'POST',
      url: HOST + '/gomi/Door/devReset',
      data: {
        'appid': Appid,
        'secret': Secret,
        'roomnu': data.roomNum,
        'requestid': '1'
      },
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }).then(resp => {
      resolve(resp)
    }).catch(err => {
      reject(err)
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
          url: RemoteAddress + '/dev-signal-test?appid=' + Appid + '&roomnu=' + data.roomNum + '&requestid=1&token=' + response.data.token
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

// 获取token
export function getToken () {
  return new Promise(function (resolve, reject) {
    axios({
      method: 'GET',
      url: RemoteAddress + '/token?appid=' + Appid + '&secret=' + Secret
    }).then(resp => {
      resolve(resp)
    }).catch(err => {
      reject(err)
    })
  })
}
