<template>
    <div class="room-list">
        <el-table
                ref="multipleTable"
                :data="roomList"
                size="mini"
                height="100%"
                style="width: 100%"
                @selection-change="handleSelectionChange">
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    prop="room_num"
                    label="房间号"
                    fixed></el-table-column>
            <el-table-column
                    prop="room_id"
                    label="房间ID"></el-table-column>
            <el-table-column
                    prop="room_type_name"
                    label="房型"></el-table-column>
            <el-table-column
                    prop="state"
                    label="状态">
                <template slot-scope="scope">
                    <span>{{orderState(scope.row.state)}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    width="450"
                    fixed="right"
                    label="操作">
                <template slot-scope="scope">
                    <div style="white-space: nowrap">
                        <el-button size="mini" type="primary" plain @click="handleSingleMakeCard(scope.row)">制卡</el-button>
                        <el-button size="mini" type="success" plain @click="handleSingleTestSignal(scope.row)">信号测试</el-button>
                        <el-button size="mini" type="info" plain @click="handleSingleOpenDoor(scope.row)">开门</el-button>
                        <el-button size="mini" type="warning" plain @click="handleSingleSetState(scope.row)">状态设置</el-button>
                        <el-button size="mini" type="danger" plain @click="handleSingleReset(scope.row)">复位</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <make-card-dialog ref="makeCardDialog"></make-card-dialog>
        <set-state-dialog ref="setStateDialog"></set-state-dialog>
    </div>
</template>

<script>
import { hrooms } from '@/api/room'
import MakeCardDialog from './MakeCardDialog'
import { openDoor, devReset, devSingalTest } from '@/api/roomCardRemote'
import SetStateDialog from './SetStateDialog'
import { showNotify } from '@/utils/notify'
import RoomManagementHelper from '@/utils/RoomManagementHelper'

export default {
  name: 'RoomList',
  components: {SetStateDialog, MakeCardDialog},
  data () {
    return {
      roomList: [],
      selectedRoomList: []
    }
  },
  created () {
    this.getRoomList()
  },
  methods: {
    getRoomList: function () {
      this.$emit('loadingStart')
      hrooms().then(response => {
        this.$emit('loadingEnd')
        let list = Object.values(response.data.data)
        list.sort(function (a, b) {
          return +a.room_id - +b.room_id
        })
        this.roomList = list.map(function (item) {
          item.room_id = item.sid + '-' + item.room_id
          return item
        })
      }).catch(reason => {
        this.$emit('loadingEnd')
        this.roomList = []
      })
    },
    orderState: function (state) {
      return RoomManagementHelper.getLabelByStatus(state)
    },
    // 选择变化
    handleSelectionChange: function (val) {
      this.selectedRoomList = val
    },
    // 单门制卡
    handleSingleMakeCard: function (val) {
      this.$refs.multipleTable.clearSelection()
      this.$refs.multipleTable.toggleRowSelection(val)
      this.showMakeCardDialog()
    },
    // 单门信号测试
    handleSingleTestSignal: function (val) {
      this.$refs.multipleTable.clearSelection()
      this.$refs.multipleTable.toggleRowSelection(val)
      this.showTestSignalDialog()
    },
    // 单门开门
    handleSingleOpenDoor: function (val) {
      this.$refs.multipleTable.clearSelection()
      this.$refs.multipleTable.toggleRowSelection(val)

      this.$confirm('开门（房间：' + val.room_num + '），是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleOpenDoor()
      })
    },
    // 单门设置状态
    handleSingleSetState: function (val) {
      this.$refs.multipleTable.clearSelection()
      this.$refs.multipleTable.toggleRowSelection(val)
      this.showSetStateDialog()
    },
    // 单门复位
    handleSingleReset: function (val) {
      this.$refs.multipleTable.clearSelection()
      this.$refs.multipleTable.toggleRowSelection(val)

      this.$confirm('复位（房间：' + val.room_num + '），是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleReset()
      })
    },
    // 批量制卡
    handleBatchMakeCard: function () {
      if (this.selectedRoomList.length) {
        this.showMakeCardDialog()
      } else {
        this.$message.error('请选择房间')
      }
    },
    // 批量测试信号
    handleBatchTestSignal: function () {
      if (this.selectedRoomList.length) {
        this.showTestSignalDialog()
      } else {
        this.$message.error('请选择房间')
      }
    },
    showMakeCardDialog: function () {
      if (this.$refs.makeCardDialog) {
        this.$refs.makeCardDialog.showDialog()
        this.$refs.makeCardDialog.setSelectedRoomList(this.selectedRoomList)
      }
    },
    showSetStateDialog: function () {
      if (this.$refs.setStateDialog) {
        this.$refs.setStateDialog.showDialog()
        this.$refs.setStateDialog.setSelectedRoomList(this.selectedRoomList)
      }
    },
    showTestSignalDialog: function () {
      let text = this.selectedRoomList.length > 1 ? '批量信号测试' : '信号测试（房间：' + this.selectedRoomList[0].room_num + '）'
      this.$confirm(text + '，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleSignalTest()
      })
    },
    // 开门
    handleOpenDoor: function () {
      this.selectedRoomList.forEach(roomItem => {
        openDoor({roomNum: roomItem.room_id}).then(response => {
          showNotify({
            title: (response.data.code === 0 ? '成功' : '错误') + '（房间：' + roomItem.room_num + '）',
            message: response.data.errmsg,
            type: response.data.code === 0 ? 'success' : 'error'
          })
        }).catch(reason => {
          this.$message.error(reason.message)
        })
      })
    },
    // 复位
    handleReset: function () {
      this.selectedRoomList.forEach(roomItem => {
        devReset({roomNum: roomItem.room_id}).then(response => {
          showNotify({
            title: (response.data.code === 0 ? '成功' : '错误') + '（房间：' + roomItem.room_num + '）',
            message: response.data.errmsg,
            type: response.data.code === 0 ? 'success' : 'error'
          })
        }).catch(reason => {
          this.$message.error(reason.message)
        })
      })
    },
    // 信号测试
    handleSignalTest: function () {
      this.selectedRoomList.forEach(roomItem => {
        devSingalTest({roomNum: roomItem.room_id}).then(response => {
          showNotify({
            title: (response.data.code === 0 ? '成功' : '错误') + '（房间：' + roomItem.room_num + '）',
            message: response.data.errmsg,
            type: response.data.code === 0 ? 'success' : 'error'
          })
        }).catch(reason => {
          this.$message.error(reason.message)
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
    .room-list {
        height: 100%;
    }
</style>