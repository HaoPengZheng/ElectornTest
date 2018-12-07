<template>
  <div class="base-floor">
    <div class="label">
      <span>{{floorNumber}}F:</span>
    </div>
    <el-row :gutter="8">
      <el-col :xl="2" :sm="6" :xs="12" v-for="(room) in floorRooms" :key="room.room_id">
        <base-room :roomInfo="room"></base-room>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import BaseRoom from './BaseRoom'
export default {
  name: 'base-floor',
  components: {
    BaseRoom
  },
  props: {
    floorNumber: String,
    floorRooms: Array
  },
  computed: {

  }
}
</script>
<style lang="scss" scoped>
.base-floor {
  .label{
    font-weight: 700;
    font-size: 24px;
    text-align: left;
  }
} 
</style>
