<template>
  <div class="base-room" :style="roomBackgorundStyle" :id="`room${getRoomInfo.room_num}`" :class="roomTypeClass" @click="showDetail" @mouseleave="hiddenContextMenu" @contextmenu="showContextMenu">
    <div class="room-attribute" :class="{emphasize:isAnchorRoomNum}">
      <div class="attribute-style">
        <span class="room-number">{{getRoomInfo.room_num}}</span>
        <span class="room-type">{{getRoomInfo.room_type_name}}</span>
      </div>
      <div class="status-icon">
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="iconType"></use>
        </svg>
     </div>
      <div class="attribute-style">
        <span class="room-number">{{getRoomInfo.people_num>0?getRoomInfo.people_num:""}}</span>
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
import {checkIn} from '@/api/room'
export default {
  name: 'base-room',
  data () {
    return {
      isShowContextMenu: false,
      contextOffsetX: 0,
      contextOffsetY: 0,
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
      return this.roomManagementHelper.getLabelByStatus(this.getState)
    },
    roomBackgorundStyle () {
      if (this.$store.getters.getInputTypeFileter.isNeedInputTypeFileter) {
        return {
          background: this.$store.getters.getInputTypeFileter.emphasizeColor
        }
      }
      return {}
    },
    roomTypeClass () {
      let classObj = {}
      let cleanOrDirty = this.roomManagementHelper.getCleanOrDirtyBySattus(this.getState)
      classObj[`status-${cleanOrDirty}`] = true
      classObj['activeContext'] = this.isShowContextMenu
      classObj['emphasize'] = this.isAnchorRoomNum
      return classObj
    },
    iconType () {
      return this.roomManagementHelper.getIconNameByStatus(this.getState)
    },
    getRoomInfo () {
      return this.roomInfo === undefined ? {state: ''} : this.roomInfo
    },
    getState () {
      return this.roomInfo === undefined ? '' : this.getRoomInfo.state
    },
    getAnchorRoomNum () {
      return this.$store.getters.getAnchorRoomNum
    },
    isAnchorRoomNum () {
      return this.getRoomInfo.room_num === this.getAnchorRoomNum
    }
  },
  methods: {
    showContextMenu: function (e) {
      this.isShowContextMenu = true
      this.contextOffsetX = e.clientX
      this.contextOffsetY = e.clientY
    },
    hiddenContextMenu: function () {
      this.isShowContextMenu = false
    },
    showDetail: function () {
      this.$store.dispatch('updateRoomDetail', {visibility: true, roomId: this.getRoomInfo.room_id})
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
      let roomId = []
      roomId.push(this.getRoomInfo.room_num)
      checkIn({'room_id': roomId}).then(response => {
        const h = this.$createElement
        let type = response.data.status === 'false' ? 'error' : 'success'
        let title = response.data.status === 'false' ? '操作失败' : '操作成功'
        this.$notify({
          type,
          title,
          /* eslint-disable  */
          message: h('i', { style: 'color: teal'}, response.data.message)
        })
      })
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
  border: 2px solid #ebeef5;
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
  &.emphasize{
    border:2px solid red;
    box-sizing: border-box;
  }
  .room-attribute{
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
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

