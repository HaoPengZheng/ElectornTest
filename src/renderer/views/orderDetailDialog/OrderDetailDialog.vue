<template>
  <el-dialog
    title="订单"
    :visible.sync="viewsDetailDialogVisible"
    width="50%"
  >
    <div v-loading="loadingOrderDetail">
      <order-detail
        :orderNo="viewsDetailOrderNo"
        @openLoadingOrderDetail="loadingOrderDetail=$event"
      ></order-detail>
      <div class="footer">
        <el-button
          size="mini"
          type="danger"
          @click="handleClose"
        >关闭</el-button>
        <el-button
          size="mini"
          type="primary"
        >结账</el-button>
        <el-button
          size="mini"
          type="primary"
        >编辑</el-button>
        <el-button
          size="mini"
          type="primary"
        >处理</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import OrderDetail from './components/OrderDetail'
export default {
  name: 'OrderDetailDialog',
  components: {
    OrderDetail
  },
  props: ['show', 'orderNo'],
  data () {
    return {
      loadingOrderDetail: false,
      viewsDetailDialogVisible: false,
      viewsDetailOrderNo: ''
    }
  },
  watch: {
    show: function () {
      this.viewsDetailDialogVisible = this.show
    },
    orderNo: function () {
      this.viewsDetailOrderNo = this.orderNo
    },
    viewsDetailDialogVisible: function () {
      if (this.viewsDetailDialogVisible === false) {
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