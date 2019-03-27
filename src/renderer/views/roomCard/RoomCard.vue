<template>
    <div class="room-card" v-loading="loadingRoomCardPage">
        <div class="header">
            <el-button @click="handleBatchTestSignal">批量信号测试</el-button>
            <el-button @click="handleBatchMakeCard">批量制卡</el-button>
        </div>
        <div class="main">
            <room-list class="room-list" ref="roomList"
                       @loadingStart="loadingRoomCardPage=true"
                       @loadingEnd="loadingRoomCardPage=false"></room-list>
        </div>
    </div>
</template>

<script>
import RoomList from './components/RoomList'
export default {
  name: 'RoomCard',
  components: {RoomList},
  data () {
    return {
      loadingRoomCardPage: true
    }
  },
  created () {
    this.getRoomList()
  },
  computed: {
    shopId () {
      return this.$store.getters.getShopId
    }
  },
  watch: {
    shopId: function () {
      this.getRoomList()
    }
  },
  methods: {
    // 获取房间列表
    getRoomList: function () {
      if (this.$refs.roomList) {
        this.$refs.roomList.getRoomList()
      }
    },
    // 批量制卡
    handleBatchMakeCard: function () {
      if (this.$refs.roomList) {
        this.$refs.roomList.handleBatchMakeCard()
      }
    },
    // 批量信号测试
    handleBatchTestSignal: function () {
      if (this.$refs.roomList) {
        this.$refs.roomList.handleBatchTestSignal()
      }
    }
  }
}
</script>

<style scoped lang="scss">
    .room-card {
        height: 100%;
        padding: 20px;
        box-sizing: border-box;
        .header {
            height: 60px;
            padding: 10px;
            border-bottom: 1px solid #ddd;
            box-sizing: border-box;
            text-align: right;
            background: #fff;
        }
        .main {
            height: calc(100% - 60px);
        }
    }
</style>
