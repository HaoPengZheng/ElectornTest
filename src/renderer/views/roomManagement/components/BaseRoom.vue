<template>
  <div class="base-room" :class="roomTypeClass" @click="showDetail" @mouseleave="hiddenContextMenu" @contextmenu="showContextMenu">
    <div class="room-attribute">
      <div class="attribute-style">
        <span class="room-number">{{roomInfo.room_num}}</span>
        <span class="room-type">{{roomInfo.room_type_name}}</span>
      </div>
      <div class="status-icon">
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="iconType"></use>
        </svg>
     </div>
      <div class="attribute-style">
        <span class="room-number">{{roomInfo.people_num>0?roomInfo.people_num:""}}</span>
        <span class="room-type">{{roomStatusLabel}}</span>
      </div>
    </div>
    <div class="room-context-menu" :style="{top:contextOffsetY+'px',left:contextOffsetX+'px'}">
      <ul>
        <li @click="cleanRoom">住房清洁</li>
        <li @click="checkOut">退房</li>
        <li @click="cleanComplete">清洁完成</li>
        <li @click="checkIn">入住</li>
      </ul>
    </div>
  </div>
</template>
<script>
import RoomManagementHelper from './RoomManagementHelper.js'
export default {
  name: 'base-room',
  data () {
    return {
      isShowContextMenu: false,
      contextOffsetX: 0,
      contextOffsetY: 0,
      roomType: this.roomInfo.room_type,
      roomStatus: this.roomInfo.state,
      roomManagementHelper: Object
    }
  },
  props: {
    roomInfo: Object
  },
  created: function () {
    this.roomManagementHelper = new RoomManagementHelper()
  },
  computed: {
    roomStatusLabel () {
      return this.roomManagementHelper.getLabelByStatus(this.roomStatus)
    },
    roomTypeClass () {
      let classObj = {}
      let cleanOrDirty = this.roomManagementHelper.getCleanOrDirtyBySattus(this.roomStatus)
      classObj[`status-${cleanOrDirty}`] = true
      classObj['activeContext'] = this.isShowContextMenu
      return classObj
    },
    iconType () {
      return this.roomManagementHelper.getIconNameByStatus(this.roomStatus)
    }
  },
  methods: {
    showContextMenu: function (e) {
      this.isShowContextMenu = true
      this.contextOffsetX = e.clientX
      this.contextOffsetY = e.clientY
      console.log(this.contextOffsetX)
    },
    hiddenContextMenu: function () {
      this.isShowContextMenu = false
    },
    showDetail: function () {
      this.$store.dispatch('updateRoomDetail', {visibility: true, roomId: this.roomInfo.room_id})
    },
    cleanRoom: function (e) {
      e.stopPropagation()
      this.roomStatus = 'OD'
      this.isShowContextMenu = false
    },
    cleanComplete: function (e) {
      e.stopPropagation()
      this.roomStatus = 'VC'
      this.isShowContextMenu = false
    },
    checkOut: function (e) {
      e.stopPropagation()
      this.roomStatus = 'VD'
      this.isShowContextMenu = false
    },
    checkIn: function (e) {
      e.stopPropagation()
      this.roomStatus = 'OC'
      this.isShowContextMenu = false
    }
  }
}
</script>
<style lang="scss" scoped>
.base-room {
  width: 100%;
  height: 100%;
  min-height: 100px;
  max-width: 100%;
  cursor: pointer;
  display: flex;
  border: 1px solid #ebeef5;
  border-radius: 10px;
  margin-bottom: 5px;
  background-color: #fff;
  color: #303133;
  justify-items: center;
  position: relative;
  &:hover{
    -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  }
  &.status-dirty{
    background-color:#f8d347;
  }
  &.status-clean{
    background-color: #6ccac9;
  }
  .status-icon{
    min-width: 80px;
    font-size: 60px;
    line-height: 60px;
    color: #fff;
  }
  &.activeContext .room-context-menu{
    display: block;
  }
  .room-context-menu{
    position:fixed;
    background: #fff;
    background-color:#fff;
    border:1px solid #eee;
    -moz-box-shadow: 10px 10px 5px #888888; /* 老的 Firefox */
    box-shadow: 5px 5px 2px #888888;
    display: none;
    z-index: 999;
    text-align: left;
    ul{
      padding: 2px;
      li{
        min-width: 100px;
        padding: 5px 15px;
        color: #303133;
      }
      li:hover{
        background-color: #ebebeb;
      }
    }
  }
  .room-attribute{
    padding: 10px;
    width: 100%;
    .attribute-style{
      display: flex;
      justify-content: space-between;
      .room-number{
        color:rgb(255, 108, 96);
        font-weight: 700;
        font-size: 20px;
      }
      .room-type{
        color: rgb(129, 117, 199);
        font-size: 18px;
        font-weight: 700;
      }
    }
  }
}
</style>

