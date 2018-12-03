<template>
  <div class="dashboard-control">
    <floor-filter></floor-filter>
    <room-filter></room-filter>
  </div>
</template>
<script>
import RoomFilter from './RoomFilter'
import FloorFilter from './FloorFilter'
export default {
  components: {
    RoomFilter,
    FloorFilter
  },
  data () {
    return {
      show: false
    }
  }
}
</script>
<style lang="scss" scoped>
.dashboard-control {
  background: #fff;
  margin: 15px 0;
  padding: 10px 0;
}
.fiexd-left{
  position: fixed;
  top: 0;
  left: 0;
  right: 320px;
  height: 100%;
  background: #000;
  opacity: 0.5;
  z-index: 999;
}
.fiexd-right{
  position: fixed;
  top: 0;
  right: 0;
  width: 320px;
  height: 100%;
  background: #fcfcfc;
  z-index: 999;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>