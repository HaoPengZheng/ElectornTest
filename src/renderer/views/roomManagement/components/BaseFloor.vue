<template>
  <div class="base-floor">
    <div class="label">
      <span>{{floorNumber}}F:</span>
    </div>
    <div>
      <el-row :gutter="8">
        <el-col :xl="2" :md="4" :sm="6"  :xs="8" v-for="(room) in floorRooms" :key="room.room_id">
          <base-room :roomInfo="room"></base-room>
        </el-col>
      </el-row>
    </div>
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
  computed: {}
}
</script>
<style lang="scss" scoped>
.base-floor {
  .label {
    display: flex;
    justify-content: flex-start;
    font-weight: 700;
    font-size: 24px;
    text-align: left;
    color: #000;
  }
}
</style>
