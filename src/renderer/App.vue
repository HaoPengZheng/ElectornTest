<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import {ipcRenderer} from 'electron'
export default {
  name: 'my-project',
  created () {
    ipcRenderer.on('load', (event, arg) => {
      this.$router.push('/reception-assistant')
    })
  }
}
</script>

<style>
  @import url('./styles/icon.css');
  @import url('./styles/global.css');
  @import url('./styles/bootstrap.css');
</style>
