<template>
  <div class="nav-bar">
    <div class="nav-bar-left">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liebiao"></use>
      </svg>
    </div>
    <div class="nav-bar-right">
      <change-shop></change-shop>
      <el-button type="danger" @click="showReceptionHelper">前台助手</el-button>
      <user-setting></user-setting>
    </div>
  </div>
</template>
<script>
import ChangeShop from './ChangeShop'
import UserSetting from './UserSetting'
import {ipcRenderer} from 'electron'
export default {
  name: 'nav-bar',
  components: {
    UserSetting,
    ChangeShop
  },
  methods: {
    showReceptionHelper () {
      ipcRenderer.send('createReceptionHelper')
      ipcRenderer.on('receptionHelperReply', (event, args) => {
        console.log(args)
        ipcRenderer.sendTo(args, 'load', true)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
$icon-color:#797979;
.nav-bar{
  display: flex;
  justify-content: space-between;
  .nav-bar-left{
    .icon{
      color: $icon-color;
    }
  }
  .nav-bar-right{
    display: flex;
    align-items: center;
  }
}
</style>
