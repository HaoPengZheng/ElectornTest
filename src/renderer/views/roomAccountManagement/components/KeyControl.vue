<template>
  <div
    class="key-control"
    @keyup="handleHotKey"
  >
    <el-button
      :type="type"
      :size="size"
      plain
    >单号：264271</el-button>
    <el-button
      :type="type"
      :size="size"
      plain
      @click="calloutRoom"
    >1.调客房</el-button>
    <el-button
      :type="type"
      :size="size"
      plain
    >2.账务处理</el-button>
    <el-button
      :type="type"
      :size="size"
      plain
    >5.清账</el-button>
    <el-button
      :type="type"
      :size="size"
      plain
    >7.客房离店</el-button>
    <el-button
      :type="type"
      :size="size"
      plain
    >9.查询</el-button>
    <el-button
      :type="type"
      :size="size"
      plain
    >操作日志</el-button>
    <el-button
      :type="type"
      :size="size"
      plain
    >8.当前账单</el-button>
    <el-button
      :type="type"
      :size="size"
      plain
    >E.检索</el-button>

    <el-dialog
      title="提示"
      :visible.sync="calloutRoomDialogVisible"
      width="30%"
    >
      <el-input v-model="calloutRoomNum" ref="calloutInput" :autofocus="true" @keyup.esc.native="calloutRoomDialogVisible=false"></el-input>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogVisible = false"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'key-control',
  data () {
    return {
      type: 'primary',
      size: 'mini',
      calloutRoomDialogVisible: false,
      calloutRoomNum: ''
    }
  },
  created () {
    document.onkeydown = this.handleHotKey
  },
  methods: {
    handleHotKey (event) {
      let keycode = event.key
      if (this.calloutRoomDialogVisible) {
        return
      }
      console.log(event)
      console.log(event.key)
      switch (keycode) {
        case '1': {
          this.calloutRoom()
        }
      }
    },
    doElementFocus (element) {
      setTimeout(() => {
        element.focus()
      }, 500)
    },
    calloutRoom () {
      this.calloutRoomDialogVisible = true
      this.$nextTick(() => {
        this.doElementFocus(this.$refs.calloutInput)
      })
    },
    initCalloutRoomDialog () {
      this.calloutRoomNum = ''
    }
  }
}
</script>
<style lang="scss">
.key-control {
  display: flex;
  justify-content: space-around;
  padding: 0 0 10px 0;
  margin-bottom: 15px;
  border-bottom: 2px solid #e4e7ed;
}
</style>

