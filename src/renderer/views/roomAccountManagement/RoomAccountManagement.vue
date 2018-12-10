<template>
  <div class="room-account-management">
    <div class="warp">
      <div>
        <key-control></key-control>
      </div>
      <div class="room-account-main height-fill-available">
        <div style="width:67%;margin-right:3%;">
          <room-account-detail></room-account-detail>
        </div>
        <div style="width:30%;">
          <room-account-list></room-account-list>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import RoomAccountDetail from './components/RoomAccountDetail'
import RoomAccountList from './components/RoomAccountList'
import KeyControl from './components/KeyControl'
export default {
  name: 'room-account-management',
  components: {
    RoomAccountDetail,
    RoomAccountList,
    KeyControl
  }
}
</script>
<style lang="scss">
.room-account-management {
  height: 100%;
  box-sizing: border-box;
  position: relative;
  min-width: 500px;
  .warp {
    background: #fff;
    padding: 20px;
    position: absolute;
    top: 20px;
    left: 20px;
    right: 20px;
    bottom: 20px;
    overflow: hidden;
    .room-account-main{
      display:flex;
      justify-content: space-around;
    }
  }
}
</style>

