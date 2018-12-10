<template>
  <div class="room-account-detail" style="display:flex;flex-direction: column;height: 100%;">
    <div class="panel panel-default">
      <div class="panel-heading">房间列表</div>
      <div class="panel-body">在住人数：75</div>
    </div>
    <div class="height-fill-available">
      <el-table :data="getTableRoomList" style="height:100%;width:100%;" :height="`98%`" border>
        <el-table-column prop="room_num" label="房号" width="100"></el-table-column>
        <el-table-column prop="check_in" label="单号" width="100"></el-table-column>
        <el-table-column prop="check_out" label="入住时间"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    getTableRoomList () {
      return this.$store.getters.getHadCheckInRoom
    }
  }
}
</script>
<style lang="scss">
.room-account-detail{
  .el-table{
    td{
      padding : 4px 0;
    }
  }
}
</style>
