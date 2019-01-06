<template>
  <el-dialog
    title="请选择结账方式："
    :visible.sync="viewsOrderSettleAccountDialogVisible"
    width="40%"
    :before-close="handleClose"
  >
    <div v-loading="loadingOrderSettleAccount">
      <settle-account
        :orderNo="viewsOrderNo"
        @openLoadingOrderSettleAccount="loadingOrderSettleAccount=$event"
        @closeDialog="handleClose"
      >
      </settle-account>

    </div>
  </el-dialog>
</template>

<script>
import SettleAccount from './components/SettleAccount'
export default {
  name: 'OrderSettleAccountDialog',
  components: {
    SettleAccount
  },
  props: ['show', 'orderNo'],
  data () {
    return {
      loadingOrderSettleAccount: false,
      viewsOrderSettleAccountDialogVisible: false,
      viewsOrderNo: ''
    }
  },
  watch: {
    show: function () {
      this.viewsOrderSettleAccountDialogVisible = this.show
    },
    orderNo: function () {
      this.viewsOrderNo = this.orderNo
    },
    viewsOrderSettleAccountDialogVisible: function () {
      if (this.viewsOrderSettleAccountDialogVisible === false) {
        this.handleClose()
      }
    }
  },
  methods: {
    handleClose: function () {
      this.$emit('openOrderDialog', false)
    }
  }
}
</script>

<style scoped>
.footer {
  text-align: center;
}
</style>