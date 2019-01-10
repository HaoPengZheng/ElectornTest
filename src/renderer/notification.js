import Echo from 'laravel-echo'
import io from 'socket.io-client'
import store from './store'
import { Notification } from 'element-ui'
/*
  node_modules 里的 echo.js
  将 "export default Echo;" 改为 "module.exports = Echo;"
*/
window.io = io
window.Echo = new Echo({
  broadcaster: 'socket.io',
  host: store.getters.getSocketHost
})

/*
  使用监听
  channel
  listen
  res
  window.Echo.channel('Room6649').listen('.roomState', (res) => {
    // todo..
  })
*/
window.Echo.channel('Room6649').listen('.roomState', (res) => {
  store.dispatch('updateOneRoomById', res)
  Notification.warning({
    title: '提醒',
    message: `${res.room_num}房间状态发生了改变`
  })
})
