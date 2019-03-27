<template>
    <div style="text-align: left">
        <el-dialog title="状态设置" :visible.sync="isShow">
            <el-form>
                <el-form-item label="已选房:">
                    <el-tag
                            class="tag"
                            v-for="(item, idx) in selectedRoomList"
                            :key="idx"
                            :disable-transitions="false">{{item.room_num}}</el-tag>
                </el-form-item>
                <el-form-item label="门锁状态:">
                    <el-radio-group v-model="currentState">
                        <el-radio :label="2">正常状态</el-radio>
                        <el-radio :label="1">常开</el-radio>
                        <el-radio :label="0">常关</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isShow=false">关闭</el-button>
                <el-button type="primary" @click="handleSetState" :disabled="isDisableSetState">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { devNoncSet } from '@/api/roomCardRemote'
import { showNotify } from '@/utils/notify'
export default {
  name: 'SetStateDialog',
  data () {
    return {
      isShow: false,
      selectedRoomList: [],
      currentState: 2
    }
  },
  computed: {
    isDisableSetState: function () {
      return !(this.selectedRoomList.length > 0 && this.currentState !== '')
    }
  },
  methods: {
    initData: function () {
      this.selectedRoomList = []
      this.currentState = 2
    },
    showDialog: function () {
      this.initData()
      this.isShow = true
    },
    // 设置所选房间
    setSelectedRoomList: function (selectedRoomList) {
      this.selectedRoomList = selectedRoomList
    },
    // 设置状态
    handleSetState: function () {
      this.isShow = false
      this.selectedRoomList.forEach(roomItem => {
        devNoncSet({roomNum: roomItem.room_id, actionType: this.currentState}).then(response => {
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

<style scoped>

</style>