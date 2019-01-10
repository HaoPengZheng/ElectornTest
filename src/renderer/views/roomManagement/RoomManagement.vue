<template>
  <div class="room-management"    v-loading="loading">
    <div>
      <div class="room-management-main">
        <el-row class="height-100">
          <el-col class="height-100" :sm="24">
            <room-dashboard></room-dashboard>
          </el-col>
        </el-row>
      </div>
      <div class="room-management-footer">
        <room-management-footer></room-management-footer>
      </div>
    </div>
    <div>
      <room-order-dialog></room-order-dialog>
    </div>
    <div class="room-order-zoomin" v-show="getIsShowRoomOrderZoomIn">
      <div class="zoomin-main">
        <div class="self-dialog-title">
          <div class="option" @click="handleZoomOut" title="缩小">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-icon--"></use>
            </svg>
          </div>
          <div class="option" @click="handleClose" title="关闭">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-guanbi"></use>
            </svg>
          </div>
        </div>
        <room-order></room-order>
      </div>
    </div>
  </div>
</template>
<script>
import BaseRoom from './components/BaseRoom.vue'
import RoomManagementHeader from './components/RoomManagementHeader'
import RoomDashboard from './components/RoomDashboard'
import RoomManagementFooter from './components/RoomManagementFooter'
import RoomOrderDialog from './components/RoomOrderDialog'
import RoomOrder from './components/RoomOrder'
import { hrooms } from '@/api/room'
export default {
  name: 'room-management',
  components: {
    BaseRoom,
    RoomManagementHeader,
    RoomDashboard,
    RoomManagementFooter,
    RoomOrderDialog,
    RoomOrder
  },
  created: function () {
    this.getAllRoom()
  },
  data () {
    return {
      loading: true
    }
  },
  methods: {
    getAllRoom: function () {
      hrooms().then(response => {
        this.$store.dispatch('resetRoomManagement')
        this.$store.dispatch('initRoomList', response.data.data)
        this.closeLoading()
      })
    },
    closeLoading () {
      this.loading = false
    },
    handleClose () {
      this.$store.dispatch('updateisShowRoomOrderDialog', false)
      this.$store.dispatch('updateIsShowZoomIn', false)
    },
    handleZoomOut () {
      this.$store.dispatch('updateisShowRoomOrderDialog', true)
      this.$store.dispatch('updateIsShowZoomIn', false)
    }
  },
  computed: {
    getIsShowRoomOrderDialog () {
      return this.$store.state.RoomManagement.isShowRoomOrderDialog
    },
    getIsShowRoomOrderZoomIn () {
      return this.$store.state.RoomManagement.isShowRoomOrderZoomIn
    }
  }
}
</script>
<style lang="scss" scoped>
.room-management {
  height: 100%;
  position: relative;
  .room-management-main {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 45px;
  }
  .room-management-footer {
    background: #e4e4e4;
    height: 40px;
    position: absolute;
    bottom: 0;
    width: 100%;
  }
  .room-order-zoomin {
    position: absolute;
    top: 0px;
    bottom: 0px;
    z-index: 999;
    width: 100%;
    background: #e4e4e4;
    padding: 30px;
    .zoomin-main {
      position: relative;
      background: #fff;
      height: 100%;
      .self-dialog-title {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 999;
        width: 60px;
        line-height: 35px;
        display: flex;
        justify-content: flex-end;
        .option {
          cursor: pointer;
          padding: 0 8px;
          &:hover {
            color: rgb(48, 132, 228);
          }
        }
      }
    }
  }
}
</style>