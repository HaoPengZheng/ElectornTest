<template>
    <div style="text-align: left">
        <el-dialog title="制卡" :visible.sync="isShow" @opened="handleOpened">
            <el-form :model="form" label-width="80px" label-position="left">
                <el-form-item label="已选房:">
                    <div style="max-height: 200px;overflow-y: auto;">
                    <el-tag
                            class="tag"
                            v-for="(item, idx) in selectedRoomList"
                            :key="idx"
                            :disable-transitions="false">{{item.room_num}}</el-tag>
                    </div>
                </el-form-item>
                <el-form-item label="到期时间:">
                    <el-date-picker
                            v-model="form.expireDate"
                            type="datetime"
                            placeholder="选择日期时间"
                            align="right"
                            value-format="timestamp"
                            style="width: 220px"
                            :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="房卡ID:">
                    <el-input
                            type="password"
                            ref="inputCard"
                            v-model="form.cardNum"
                            style="width: 220px"
                            autocomplete="off"
                            clearable
                            @keyup.enter.native="handleInputCardList"></el-input>
                </el-form-item>
                <el-form-item label="已读取:">
                    <el-tag
                            class="tag"
                            v-for="(item, idx) in inputCardList"
                            :key="idx"
                            :disable-transitions="false"
                            closable @close="handleCloseTag(item)">卡{{idx + 1}}</el-tag>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isShow=false">关闭</el-button>
                <el-button type="info" @click="handleUntyingCard" :disabled="isDisableUnTyingCard">取消发卡</el-button>
                <el-button type="primary" @click="handleTyingCard" :disabled="isDisableTyingCard">发卡</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { setRoomCard, cancelRoomCard } from '@/api/roomCardRemote'
import { showNotify } from '@/utils/notify'
export default {
  name: 'MakeCardDialog',
  data () {
    return {
      isShow: false,
      form: {
        cardNum: '',
        expireDate: ''
      },
      selectedRoomList: [],
      inputCardList: [],
      pickerOptions: {
        shortcuts: [
          {
            text: '明年',
            onClick (picker) {
              let date = new Date()
              date.setFullYear(date.getFullYear() + 1, date.getMonth(), date.getDate())
              date.setHours(0, 0, 0, 0)
              picker.$emit('pick', date)
            }
          }
        ]
      }
    }
  },
  created () {
    this.setDefaultDate()
  },
  computed: {
    isDisableTyingCard: function () {
      return !(this.selectedRoomList.length > 0 && this.inputCardList.length > 0 && this.form.expireDate)
    },
    isDisableUnTyingCard: function () {
      return !(this.selectedRoomList.length > 0 && this.inputCardList.length > 0)
    }
  },
  methods: {
    initData: function () {
      this.form.cardNum = ''
      this.selectedRoomList = []
      this.inputCardList = []
      this.setDefaultDate()
    },
    showDialog: function () {
      this.initData()
      this.isShow = true
    },
    // 设置所选房间
    setSelectedRoomList: function (selectedRoomList) {
      this.selectedRoomList = selectedRoomList
    },
    handleOpened: function () {
      this.$refs.inputCard.focus()
    },
    // 设置默认时间
    setDefaultDate: function () {
      let date = new Date()
      date.setFullYear(date.getFullYear() + 1, date.getMonth(), date.getDate())
      date.setHours(0, 0, 0, 0)
      this.form.expireDate = date.getTime()
    },
    // 取消发卡
    handleUntyingCard: function () {
      this.isShow = false
      this.selectedRoomList.forEach(roomItem => {
        this.inputCardList.forEach(cardItem => {
          cancelRoomCard({roomNum: roomItem.room_id, keyValue: cardItem}).then(response => {
            showNotify({
              title: (response.data.code === 0 ? '成功' : '错误') + '（房间：' + roomItem.room_num + '）',
              message: response.data.errmsg,
              type: response.data.code === 0 ? 'success' : 'error'
            })
          }).catch(reason => {
            this.$message.error(reason.message)
          })
        })
      })
    },
    // 发卡
    handleTyingCard: function () {
      this.isShow = false
      this.selectedRoomList.forEach(roomItem => {
        this.inputCardList.forEach(cardItem => {
          setRoomCard({roomNum: roomItem.room_id, keyValue: cardItem, expireDate: (this.form.expireDate + '').substring(0, 10)}).then(response => {
            showNotify({
              title: (response.data.code === 0 ? '成功' : '错误') + '（房间：' + roomItem.room_num + '）',
              message: response.data.errmsg,
              type: response.data.code === 0 ? 'success' : 'error'
            })
          }).catch(reason => {
            this.$message.error(reason.message)
          })
        })
      })
    },
    // 输入房卡，添加tag
    handleInputCardList: function () {
      let cardNum = this.reverseCardNum(this.form.cardNum)
      this.form.cardNum = ''
      this.$refs.inputCard.clear()
      if (this.inputCardList.indexOf(cardNum) === -1) {
        this.inputCardList.push(cardNum)
      }
    },
    // 反向8位
    reverseCardNum: function (cardNum) {
      cardNum = cardNum + ''
      let list = []
      for (let i = 0; i < cardNum.length; i += 2) {
        list.push(cardNum.substring(i, i + 2))
      }
      return list.reverse().join('').toUpperCase()
    },
    // 删除房卡tag
    handleCloseTag: function (tag) {
      this.inputCardList.splice(this.inputCardList.indexOf(tag), 1)
    }
  }
}
</script>

<style scoped>
    .tag {
        margin: 0 10px 10px 0;
    }
</style>