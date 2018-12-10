<template>
  <div class="dashboard-control">
    <div class="control-filter">
      <floor-filter></floor-filter>
      <room-filter></room-filter>
    </div>
    <div class="dashboard-control-right">
      <anchor-room></anchor-room>
      <clean-room-cache></clean-room-cache>
    </div>
  </div>
</template>
<script>
import RoomFilter from './RoomFilter'
import FloorFilter from './FloorFilter'
import AnchorRoom from './AnchorRoom'
import CleanRoomCache from './CleanRoomCache'
export default {
  components: {
    RoomFilter,
    FloorFilter,
    AnchorRoom,
    CleanRoomCache
  },
  data () {
    return {
      show: false,
      roomNum: ''
    }
  }
}
</script>
<style lang="scss" scoped>
@media screen and (min-width: 600px) and (max-width: 900px) {
  .dashboard-control {
    flex-direction: column;
    display: none;
    .dashboard-control-right {
      display: flex;
        flex-direction: row;
      justify-content: flex-start;
      width: 100%;
      margin-right: 20px;
    }
  }
}
.dashboard-control {
  background: #fff;
  margin: 15px 0;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .control-filter {
    min-width: 800px;
  }
  .dashboard-control-right {
    display: flex;
    justify-content: space-between;
    margin-right: 20px;
  }
}
</style>