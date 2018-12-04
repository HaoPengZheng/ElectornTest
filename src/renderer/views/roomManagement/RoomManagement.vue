<template>
  <div class="room-management">
      <!-- <div class="room-management-header">
        <room-management-header></room-management-header>
      </div> -->
      <div class="room-management-main">
        <el-row class="height-100">
          <el-col class="height-100"  :sm="24" >
            <room-dashboard></room-dashboard>
            </el-col>
          <!-- <el-col class="height-100" :xs="4" :sm="4" >2</el-col> -->
        </el-row>
      </div>
      <div class="room-management-footer">
        <room-management-footer></room-management-footer>
      </div>
  </div>
</template>
<script>
import BaseRoom from './components/BaseRoom.vue'
import RoomManagementHeader from './components/RoomManagementHeader'
import RoomDashboard from './components/RoomDashboard'
import RoomManagementFooter from './components/RoomManagementFooter'
import { hrooms } from '@/api/room'
export default {
  name: 'room-management',
  components: {
    BaseRoom,
    RoomManagementHeader,
    RoomDashboard,
    RoomManagementFooter
  },
  created: function () {
    this.getAllRoom()
  },
  methods: {
    getAllRoom: function () {
      hrooms().then(response => {
        this.$store.dispatch('initRoomList', response.data.data)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .room-management{
    height: 100%;
    width: 100%;
    position: relative;

    .room-management-main{
      position: absolute;
      top: 0px;
      bottom: 65px;
      width: 100%;
    }
    .room-management-footer{
      background: #e4e4e4;
      height: 60px;
      position: absolute;
      bottom: 0;
      width: 100%;
    }
  }
</style>