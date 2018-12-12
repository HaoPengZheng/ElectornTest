<template>
  <vue-scroll>
    <div class="room-dashboard">
      <dashboard-control></dashboard-control>
      <room-detail></room-detail>
      <base-floor
        :floorNumber="index"
        :floorRooms="floorRooms"
        v-for="(floorRooms,index) in getAllFloorRoom"
        :key="index"
      ></base-floor>
    </div>
  </vue-scroll>
</template>
<script>
import BaseFloor from './BaseFloor'
import DashboardControl from './DashboardControl'
import RoomDetail from './RoomDetail'
export default {
  name: 'room-dashboard',
  components: {
    BaseFloor,
    DashboardControl,
    RoomDetail
  },
  data () {
    return {}
  },
  created: function () {},
  computed: {
    getAllFloorRoom () {
      return this.$store.getters.getAllRoomsByFilter
    }
  }
}
</script>
<style lang="scss" scoped>
.room-dashboard {
  box-sizing: border-box;
  padding: 0 5px;
  overflow: hidden;
  padding-right: 15px;
  height: 100%;
  overflow-x: hidden;
  padding: 0 30px;
}
</style>
