import { Notification } from 'element-ui'

// 弹出通知
export function showNotify (data) {
  setTimeout(function () {
    Notification(data)
  }, 10)
}
